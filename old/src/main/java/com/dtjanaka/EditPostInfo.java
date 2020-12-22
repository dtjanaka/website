package com.dtjanaka;

/**
 * Holds status of attempted edit POST and a message.
 */
public class EditPostInfo {
  boolean successful;
  String message;

  public EditPostInfo(boolean successful, String message) {
    this.successful = successful;
    this.message = message;
  }
}