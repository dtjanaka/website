package dtjanaka.servlets;

/**
 * Holds status of attempted comment post and a message.
 */
class CommentPostInfo {
  boolean successful;
  String message;

  public CommentPostInfo(boolean successful, String message) {
    this.successful = successful;
    this.message = message;
  }
}