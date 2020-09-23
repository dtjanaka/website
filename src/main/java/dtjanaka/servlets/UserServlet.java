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
  private static final Gson gson =
      new GsonBuilder().setPrettyPrinting().create();

  private static final String USER_LOGIN = gson.toJson(
      new UserPostInfo(false, "You must be logged in to edit a comment."));
  private static final String USER_BAD_LENGTH = gson.toJson(new UserPostInfo(
      false, "Usernames must be between one and twenty characters."));
  private static final String USER_BAD_CHAR = gson.toJson(new UserPostInfo(
      false, "Usernames must only contain alphanumeric characters."));
  private static final String USER_TAKEN =
      gson.toJson(new UserPostInfo(false, "This username is not available."));
  private static final String USER_COOLDOWN = gson.toJson(
      new UserPostInfo(false, "You cannot change your username right now."));
  private static final String USER_SUCCESS =
      gson.toJson(new UserPostInfo(true, "Username successfully changed."));

  /**
   * Handles POST requests for users.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("application/json");

    UserService userService = UserServiceFactory.getUserService();

    String uid = userService.getCurrentUser().getUserId();
    Instant now = Instant.now();
    String nowString = now.toString();
    String username = request.getParameter("username");

    if (!userService.isUserLoggedIn()) {
      response.getWriter().println(USER_LOGIN);
      return;
    } else if (DataUtils.isEmptyParameter(username) || username.length() > 20) {
      response.getWriter().println(USER_BAD_LENGTH);
      return;
    } else if (!DataUtils.hasLegalCharacters(username)) {
      response.getWriter().println(USER_BAD_CHAR);
      return;
    } else if (!DataUtils.isUsernameUnique(username)) {
      response.getWriter().println(USER_TAKEN);
      return;
    }

    Entity userEntity = new Entity(DataUtils.USER);
    if (DataUtils.isCurrentUserRegistered()) {
      userEntity = DataUtils.getCurrentUser();

      Instant then =
          Instant.parse((String)userEntity.getProperty("last-changed"));

      if (Duration.between(then, now).toDays() <
          DataUtils.USERNAME_CHANGE_COOLDOWN) {
        response.getWriter().println(USER_COOLDOWN);
        return;
      }
    }

    userEntity.setProperty("uid", uid);
    userEntity.setProperty("username", username);
    userEntity.setProperty("username-lowercase", username.toLowerCase());
    userEntity.setProperty("last-changed", nowString);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(userEntity);

    response.getWriter().println(USER_SUCCESS);
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