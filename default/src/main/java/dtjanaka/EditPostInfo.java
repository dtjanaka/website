package dtjanaka.servlets;

/**
 * Holds status of attempted edit POST and a message.
 */
class EditPostInfo {
  boolean successful;
  String message;

  public EditPostInfo(boolean successful, String message) {
    this.successful = successful;
    this.message = message;
  }
}