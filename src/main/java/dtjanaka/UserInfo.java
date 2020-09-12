package dtjanaka.servlets;

/**
 * Holds relevant User login info to return to front end and
 * allows for easy creation of JSON response.
 */
class UserInfo {
  boolean loggedIn;
  boolean isAdmin;
  String url;
  String username;

  public UserInfo(boolean loggedIn, boolean isAdmin, String url) {
    this.loggedIn = loggedIn;
    this.isAdmin = isAdmin;
    this.url = url;
  }
}