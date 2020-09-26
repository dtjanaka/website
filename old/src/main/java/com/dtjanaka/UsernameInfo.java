package com.dtjanaka.servlets;

/**
 * Holds relevant User login info to return to front end and
 * allows for easy creation of JSON response.
 */
class UsernameInfo {
  boolean available;
  String message;

  public UsernameInfo(boolean available, String message) {
    this.available = available;
    this.message = message;
  }
}