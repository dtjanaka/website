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
import java.time.Instant;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/edit-comment")
public class EditCommentServlet extends HttpServlet {

  /**
   * Handles POST requests for deleting comments.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    String comment = request.getParameter("comment");

    if (DataUtils.isEmptyParameter(comment) || !DataUtils.isCurrentUserRegistered()) {
      response.sendRedirect("/comments.html");
      return;
    }

    UserService userService = UserServiceFactory.getUserService();

    String uid = userService.getCurrentUser().getUserId();
    String now = Instant.now().toString();

    String cid = request.getParameter("cid");

    Query commentQuery = new Query(DataUtils.COMMENT);

    if (!DataUtils.isEmptyParameter(cid)) {
      Entity commentFromCid = DataUtils.getCommentFromCid(cid);
      if (commentFromCid != null && ((String)commentFromCid.getProperty("uid")).equals(uid)) {
        Filter cidFilter =
            new FilterPredicate("comment-id", FilterOperator.EQUAL, cid);

        commentQuery.setFilter(cidFilter);
      }
      } else {
        response.sendRedirect("/comments.html");
        return;
      }

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Entity storedComment = datastore.prepare(commentQuery).asSingleEntity();

    if (!((String)storedComment.getProperty("comment")).equals(comment)) {
      storedComment.setProperty("comment", comment);
      storedComment.setProperty("edited", now);
      datastore.put(storedComment);
    }

    response.sendRedirect("/comments.html");
  }
}
