package dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Handles comment deletion.
 */
@WebServlet("/delete-comment")
public class DeleteCommentServlet extends HttpServlet {
  private static final Gson gson =
      new GsonBuilder().setPrettyPrinting().create();

  private static final String DELETE_LOGIN = gson.toJson(
      new DeletePostInfo(false, "You must be logged in to delete a comment."));
  private static final String DELETE_ADMIN = gson.toJson(new DeletePostInfo(
      false, "You must be an admin to delete this comment."));
  private static final String DELETE_USERNAME = gson.toJson(
      new DeletePostInfo(false, "The requested user was not found."));
  private static final String DELETE_CID = gson.toJson(
      new DeletePostInfo(false, "The requested comment was not found."));
  private static final String DELETE_NO_PERMISSION = gson.toJson(
      new DeletePostInfo(false, "You cannot delete the requested comment(s)."));
  private static final String DELETE_NO_OPTIONS = gson.toJson(
      new DeletePostInfo(false, "No options were provided to delete."));
  private static final String DELETE_SUCCESS =
      gson.toJson(new DeletePostInfo(true, "Comment(s) successfully deleted."));

  /**
   * Handles POST requests for deleting comments.
   * Options for deleting a single comment, all of a user's comments,
   * or all comments.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("application/json");

    if (!DataUtils.isCurrentUserRegistered()) {
      response.getWriter().println(DELETE_LOGIN);
      return;
    }

    UserService userService = UserServiceFactory.getUserService();

    String uid = userService.getCurrentUser().getUserId();

    String username = request.getParameter("username");
    String cid = request.getParameter("cid");
    String deleteAllString = request.getParameter("delete-all");
    boolean deleteAll = false;

    if (!DataUtils.isEmptyParameter(deleteAllString)) {
      try {
        deleteAll = Boolean.parseBoolean(deleteAllString);
      } catch (Exception e) {
        throw new IOException("Error parsing argument to boolean.");
      }
    }

    Query commentQuery = new Query(DataUtils.COMMENT);

    if (deleteAll) {
      if (!userService.isUserAdmin()) {
        response.getWriter().println(DELETE_ADMIN);
        return;
      }
    } else if (!DataUtils.isEmptyParameter(username)) {
      String uidFromUsername = DataUtils.getUidFromUsername(username);
      if (uidFromUsername == null) {
        response.getWriter().println(DELETE_USERNAME);
        return;
      } else if (!userService.isUserAdmin() && !uid.equals(uidFromUsername)) {
        response.getWriter().println(DELETE_NO_PERMISSION);
        return;
      }
      Filter usernameFilter =
          new FilterPredicate("uid", FilterOperator.EQUAL, uidFromUsername);

      commentQuery.setFilter(usernameFilter);
    } else if (!DataUtils.isEmptyParameter(cid)) {
      Entity commentFromCid = DataUtils.getCommentFromCid(cid);
      if (commentFromCid == null) {
        response.getWriter().println(DELETE_CID);
        return;
      } else if (!userService.isUserAdmin() &&
                 !(((String)commentFromCid.getProperty("uid")).equals(uid))) {
        response.getWriter().println(DELETE_NO_PERMISSION);
        return;
      }
      Filter cidFilter =
          new FilterPredicate("comment-id", FilterOperator.EQUAL, cid);

      commentQuery.setFilter(cidFilter);
    } else {
      response.getWriter().println(DELETE_NO_OPTIONS);
      return;
    }

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    List<Entity> storedComments =
        datastore.prepare(commentQuery)
            .asList(FetchOptions.Builder.withDefaults());

    for (Entity comment : storedComments) {
      datastore.delete(comment.getKey());
    }

    response.getWriter().println(DELETE_SUCCESS);
  }
}
