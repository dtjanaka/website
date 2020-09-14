package dtjanaka.servlets;

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
 * Sends back the login and admin status of User and a login/logout link.
 */
@WebServlet("/login-status")
public class LoginServlet extends HttpServlet {

  /**
   * Handles GET requests for login status.
   * Responds with JSON string of UserInfo object upon successful GET.
   * UserInfo object contains:
   *    {boolean}   loggedIn    login status
   *    {boolean}   isAdmin     admin status
   *    {String}    url         login/logout link
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
