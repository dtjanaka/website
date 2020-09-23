package dtjanaka.servlets;

/**
 * Holds status of attempted delete POST and a message.
 */
class DeletePostInfo {
  boolean successful;
  String message;

  public DeletePostInfo(boolean successful, String message) {
    this.successful = successful;
    this.message = message;
  }
}