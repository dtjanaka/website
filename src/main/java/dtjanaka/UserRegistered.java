package dtjanaka.servlets;

/**
 * Holds registration status and username or null.
 */
class UserRegistered {
  boolean registered;
  String username;

  public UserRegistered(boolean registered, String username) {
    this.registered = registered;
    this.username = username;
  }
}