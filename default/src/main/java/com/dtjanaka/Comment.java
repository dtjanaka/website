package com.dtjanaka;

public class Comment {
  String username;
  String comment;
  String utc;        // timestamp
  String cid;        // Comment ID
  boolean deletable; // by current User
  boolean editable;  // by current User
  boolean edited;

  public Comment(UserRegistered userRegistered, String comment, String utc,
                 String cid, boolean deletable, boolean editable,
                 boolean edited) {
    this.username = userRegistered.username;
    this.comment = comment;
    this.utc = utc;
    this.cid = cid;
    this.deletable = deletable;
    this.editable = editable;
    this.edited = edited;
  }
}