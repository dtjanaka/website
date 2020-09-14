package dtjanaka.servlets;

/**
 * Holds registration status and username or null.
 */
class UserRegistered {
  boolean registered;
  String username;
  String displayName;

  public UserRegistered(boolean registered, String username,
                        String displayName) {
    this.registered = registered;
    this.username = username;
    this.displayName = displayName;
  }
}