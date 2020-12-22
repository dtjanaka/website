package com.dtjanaka;

/**
 * Holds status of attempted comment POST and a message.
 */
public class CommentPostInfo {
  boolean successful;
  String message;

  public CommentPostInfo(boolean successful, String message) {
    this.successful = successful;
    this.message = message;
  }
}