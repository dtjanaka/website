package dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Sends back an object indicating a username availability and/or
 * any issues with the requested username.
 */
@WebServlet("/usernames")
public class UsernameServlet extends HttpServlet {
  private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

  private static final String USERNAME_BAD_LENGTH = gson.toJson(new UsernameInfo(
      false, "Usernames must be between one and twenty characters."));
  private static final String USERNAME_BAD_CHAR = gson.toJson(new UsernameInfo(
      false, "Usernames must only contain alphanumeric characters."));
  private static final String USERNAME_TAKEN = gson.toJson(new UsernameInfo(
      false, "This username is not available."));
  private static final String USERNAME_AVAILABLE = gson.toJson(new UsernameInfo(
      true, "Username available."));

  /**
   * Handles GET requests for username checks.
   * Responds with JSON string of a single boolean successful GET.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("application/json");

    UserService userService = UserServiceFactory.getUserService();

    String username = request.getParameter("username");
    if (DataUtils.isEmptyParameter(username) || username.length() > 20) {
      response.getWriter().println(USERNAME_BAD_LENGTH);
      return;
    } else if(!DataUtils.hasLegalCharacters(username)) {
      response.getWriter().println(USERNAME_BAD_CHAR);
      return;
    }

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Query userQuery =
        new Query(DataUtils.USER)
            .setFilter(new FilterPredicate("username", FilterOperator.EQUAL, username));
    PreparedQuery storedUser = datastore.prepare(userQuery);

    if (storedUser.countEntities() != 0) {
      response.getWriter().println(USERNAME_TAKEN);
      return;
    }

    response.getWriter().println(USERNAME_AVAILABLE);
  }
}
