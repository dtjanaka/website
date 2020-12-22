package com.dtjanaka;

/**
 * Holds status of attempted user POST and a message.
 */
public class UserPostInfo {
  boolean successful;
  String message;

  public UserPostInfo(boolean successful, String message) {
    this.successful = successful;
    this.message = message;
  }
}