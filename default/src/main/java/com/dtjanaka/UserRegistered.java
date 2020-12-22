package com.dtjanaka;

/**
 * Holds registration status and username or null.
 */
public class UserRegistered {
  boolean registered;
  String username;

  public UserRegistered(boolean registered, String username) {
    this.registered = registered;
    this.username = username;
  }
}