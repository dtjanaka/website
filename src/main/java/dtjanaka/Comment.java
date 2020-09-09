package dtjanaka.servlets;

class Comment {
  String name;
  String comment;
  String utc;

  public Comment(String name, String comment, String utc) {
    this.name = name;
    this.comment = comment;
    this.utc = utc;
  }
}