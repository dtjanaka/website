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
 * Sends back an object indicating a username availability and/or
 * any issues with the requested username.
 */
@WebServlet("/username")
public class UsernameServlet extends HttpServlet {
  private static final UsernameInfo USERNAME_EMPTY = new UsernameInfo(false, "Usernames must be between one and twenty characters.");

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

    String username = request.getParameter("username");
    if (DataUtils.isEmptyParameter(username)) {
      
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
