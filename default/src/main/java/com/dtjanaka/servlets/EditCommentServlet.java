package com.dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.time.Instant;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Handles comment edits.
 */
@WebServlet("/edit-comment")
public class EditCommentServlet extends HttpServlet {
  private static final Gson gson =
      new GsonBuilder().setPrettyPrinting().create();

  private static final String EDIT_LOGIN = gson.toJson(
      new EditPostInfo(false, "You must be logged in to edit a comment."));
  private static final String EDIT_EMPTY =
      gson.toJson(new EditPostInfo(false, "A comment cannot be empty."));
  private static final String EDIT_NO_OPTIONS = gson.toJson(
      new EditPostInfo(false, "No options were provided to delete."));
  private static final String EDIT_NOT_FOUND = gson.toJson(
      new EditPostInfo(false, "The requested comment was not found."));
  private static final String EDIT_NO_PERMISSION =
      gson.toJson(new EditPostInfo(false, "You cannot edit this comment."));
  private static final String EDIT_SUCCESS =
      gson.toJson(new EditPostInfo(true, "Comment successfully edited."));

  /**
   * Handles POST requests for editing comments.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("application/json");

    String comment = request.getParameter("comment");

    if (!DataUtils.isCurrentUserRegistered()) {
      response.getWriter().println(EDIT_LOGIN);
      return;
    } else if (DataUtils.isEmptyParameter(comment)) {
      response.getWriter().println(EDIT_EMPTY);
      return;
    }

    UserService userService = UserServiceFactory.getUserService();

    String uid = userService.getCurrentUser().getUserId();
    String now = Instant.now().toString();

    String cid = request.getParameter("cid");

    Query commentQuery = new Query(DataUtils.COMMENT);

    if (!DataUtils.isEmptyParameter(cid)) {
      Entity commentFromCid = DataUtils.getCommentFromCid(cid);
      if (commentFromCid == null) {
        response.getWriter().println(EDIT_NOT_FOUND);
        return;
      } else if (!(((String)commentFromCid.getProperty("uid")).equals(uid))) {
        response.getWriter().println(EDIT_NO_PERMISSION);
        return;
      }
      Filter cidFilter =
          new FilterPredicate("comment-id", FilterOperator.EQUAL, cid);

      commentQuery.setFilter(cidFilter);
    } else {
      response.getWriter().println(EDIT_NO_OPTIONS);
      return;
    }

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Entity storedComment = datastore.prepare(commentQuery).asSingleEntity();

    if (!((String)storedComment.getProperty("comment")).equals(comment)) {
      storedComment.setProperty("comment", comment);
      storedComment.setProperty("edited", now);
      datastore.put(storedComment);
    }

    response.getWriter().println(EDIT_SUCCESS);
  }
}
