package dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
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

    String uid = userService.getCurrentUser().getUserId();
    Instant now = Instant.now();
    String nowString = now.toString();
    String username = request.getParameter("username");

    if (!userService.isUserLoggedIn() || DataUtils.isEmptyParameter(username) ||
        !DataUtils.isUsernameUnique(username)) {
      response.sendRedirect("/comments.html");
      return;
    }

    Entity userEntity = new Entity(DataUtils.USER);
    if (DataUtils.isCurrentUserRegistered()) {
      userEntity = DataUtils.getCurrentUser();

      Instant then =
          Instant.parse((String)userEntity.getProperty("last-changed"));

      if (Duration.between(then, now).toDays() <
          DataUtils.USERNAME_CHANGE_COOLDOWN) {
        response.sendRedirect("/comments.html");
        return;
      }
    }

    userEntity.setProperty("uid", uid);
    userEntity.setProperty("username", username);
    userEntity.setProperty("username-lowercase", username.toLowerCase());
    userEntity.setProperty("last-changed"), nowString);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(userEntity);

    response.sendRedirect("/comments.html");
  }

  /**
   * Handles GET requests for login status.
   * Responds with JSON string of UserInfo object upon successful GET.
   * UserInfo object contains:
   *    {boolean}   loggedIn    login status
   *    {boolean}   isAdmin     admin status
   *    {boolean}   registered  registration status
   *    {String}    url         login/logout link
   *    {String}    username
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("application/json");

    String page = request.getParameter("page");
    if (DataUtils.isEmptyParameter(page)) {
      page = "";
    }
    String userInfo = new String();

    UserService userService = UserServiceFactory.getUserService();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    if (userService.isUserLoggedIn()) {
      String logoutUrl = userService.createLogoutURL("/" + page);
      userInfo =
          gson.toJson(new UserInfo(true, userService.isUserAdmin(), logoutUrl,
                                   DataUtils.getNameCurrentUser()));
    } else {
      String loginUrl = userService.createLoginURL("/" + page);
      userInfo = gson.toJson(
          new UserInfo(false, false, loginUrl, DataUtils.getNameCurrentUser()));
    }
    response.getWriter().println(userInfo);
  }
}