package dtjanaka.servlets;

/**
 * Holds relevant User login info to return to front end and
 * allows for easy creation of JSON response.
 */
class UsernameInfo {
  boolean available;
  String issue;

  public UsernameInfo(boolean available, String issue) {
    this.available = available;
    this.issue = issue;
  }
}