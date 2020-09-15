package dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

@WebServlet("/users")
public class UserServlet extends HttpServlet {

  /**
   * Handles POST requests for comments.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    String comment = request.getParameter("comment");
    String uid = userService.getCurrentUser().getUserId();
    String token = request.getParameter("g-recaptcha-response");

    Query query = new Query("Secret").setFilter(new FilterPredicate(
        "name", FilterOperator.EQUAL, "recaptcha-comments"));

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery secret = datastore.prepare(query);

    String secretKey = (String)secret.asSingleEntity().getProperty("value");

    if (DataUtils.isEmptyParameter(comment) ||
        !isValidCaptcha(secretKey, token) ||
        !DataUtils.isCurrentUserRegistered()) {
      response.sendRedirect("/comments.html");
      return;
    }

    String now = Instant.now().toString();

    Entity commentEntity = new Entity(DataUtils.COMMENT);
    commentEntity.setProperty("comment", comment);
    commentEntity.setProperty("uid", uid);
    commentEntity.setProperty("utc", now);
    commentEntity.setProperty(
        "comment-id", KeyFactory.keyToString(datastore.put(commentEntity)));

    datastore.put(commentEntity);

    response.sendRedirect("/comments.html");
  }

  /**
   * Handles GET requests for comments.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("application/json");
  }
}