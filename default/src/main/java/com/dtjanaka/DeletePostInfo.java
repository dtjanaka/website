package com.dtjanaka;

/**
 * Holds status of attempted delete POST and a message.
 */
public class DeletePostInfo {
  boolean successful;
  String message;

  public DeletePostInfo(boolean successful, String message) {
    this.successful = successful;
    this.message = message;
  }
}