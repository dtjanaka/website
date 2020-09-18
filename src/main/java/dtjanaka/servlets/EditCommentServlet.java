package dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/edit-comment")
public class EditCommentServlet extends HttpServlet {

  /**
   * Handles POST requests for editing comments.
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

    String cid = request.getParameter("cid");
    String uid = userService.getCurrentUser().getUserId();

    Query query = new Query(DataUtils.COMMENT);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    List<Entity> storedComments =
        datastore.prepare(query).asList(FetchOptions.Builder.withDefaults());

    for (Entity comment : storedComments) {
      datastore.delete(comment.getKey());
    }
  }
}
