package dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/delete-comment")
public class DeleteCommentServlet extends HttpServlet {

  /**
   * Handles POST requests for deleting comments.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    if (!DataUtils.isCurrentUserRegistered()) {
      response.sendRedirect("/comments.html");
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
        response.sendRedirect("/comments.html");
        return;
      }
    } else if (!DataUtils.isEmptyParameter(username)) {
      String uidFromUsername = DataUtils.getUidFromUsername(username);
      if (uidFromUsername != null &&
          (userService.isUserAdmin() || uid.equals(uidFromUsername))) {
        Filter usernameFilter =
            new FilterPredicate("uid", FilterOperator.EQUAL, uidFromUsername);

        commentQuery.setFilter(usernameFilter);
      } else {
        response.sendRedirect("/comments.html");
        return;
      }
    } else if (!DataUtils.isEmptyParameter(cid)) {
      Entity commentFromCid = DataUtils.getCommentFromCid(cid);
      if (commentFromCid != null &&
          (userService.isUserAdmin() ||
           ((String)commentFromCid.getProperty("uid")).equals(uid))) {
        Filter cidFilter =
            new FilterPredicate("comment-id", FilterOperator.EQUAL, cid);

        commentQuery.setFilter(cidFilter);
      } else {
        response.sendRedirect("/comments.html");
        return;
      }
    } else {
      response.sendRedirect("/comments.html");
      return;
    }

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    List<Entity> storedComments =
        datastore.prepare(commentQuery)
            .asList(FetchOptions.Builder.withDefaults());

    for (Entity comment : storedComments) {
      datastore.delete(comment.getKey());
    }

    response.sendRedirect("/comments.html");
  }
}
