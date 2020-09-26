package dtjanaka.servlets;

/**
 * Holds status of attempted user POST and a message.
 */
class UserPostInfo {
  boolean successful;
  String message;

  public UserPostInfo(boolean successful, String message) {
    this.successful = successful;
    this.message = message;
  }
}