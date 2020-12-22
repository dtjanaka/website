package com.dtjanaka;

import java.util.ArrayList;

/**
 * Holds relevant Comments info to return to front end and
 * allows for easy creation of JSON response.
 */
public class CommentsInfo {
  boolean loggedIn;
  boolean registered;
  ArrayList<Comment> comments;

  public CommentsInfo(boolean loggedIn, boolean registered, ArrayList<Comment> comments) {
    this.loggedIn = loggedIn;
    this.registered = registered;
    this.comments = comments;
  }
}