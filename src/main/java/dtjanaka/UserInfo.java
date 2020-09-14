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
  String displayName;

  public UserInfo(boolean loggedIn, boolean isAdmin, boolean registered,
                  String url, String username, String displayName) {
    this.loggedIn = loggedIn;
    this.isAdmin = isAdmin;
    this.registered = registered;
    this.url = url;
    this.username = username;
    this.displayName = displayName;
  }

  public UserInfo(boolean loggedIn, boolean isAdmin, String url,
                  UserRegistered userRegistered) {
    this.loggedIn = loggedIn;
    this.isAdmin = isAdmin;
    this.registered = userRegistered.registered;
    this.url = url;
    this.username = userRegistered.username;
    this.displayName = userRegistered.displayName;
  }
}