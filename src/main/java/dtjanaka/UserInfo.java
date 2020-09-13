package dtjanaka.servlets;

/**
 * Holds relevant User login info to return to front end and
 * allows for easy creation of JSON response.
 */
class UserInfo {
  boolean loggedIn;
  boolean isAdmin;
  boolean registered;
  String url;
  String username;

  public UserInfo(boolean loggedIn, boolean isAdmin, boolean registered,
                  String url, String username) {
    this.loggedIn = loggedIn;
    this.isAdmin = isAdmin;
    this.registered = registered;
    this.url = url;
    this.username = username;
  }
}