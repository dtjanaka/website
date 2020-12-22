package com.dtjanaka;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 * Provides utilities for servlets interacting with the database.
 */
public final class DataUtils {
  public static final String ASCENDING_SORT = "asc";
  public static final String DESCENDING_SORT = "dsc";
  public static final String USER = "User";
  public static final String COMMENT = "Comment";
  public static final Integer USERNAME_CHANGE_COOLDOWN = 60;

  private static final UserRegistered NOT_REGISTERED =
      new UserRegistered(false, null);

  /**
   * Determines if the given request parameter is empty.
   * @param     {String}    param   request parameter
   * @return    {boolean}
   */
  public static boolean isEmptyParameter(String param) {
    return param == null || param.isEmpty();
  }

  /**
   * Removes duplicate values with a hash set.
   * @param     {ArrayList<String>} al   all values
   * @return    {List<String>}
   */
  public static List<String> withDuplicatesRemoved(ArrayList<String> al) {
    LinkedHashSet<String> lhs = new LinkedHashSet<String>(al);
    return new ArrayList<String>(lhs);
  }

  /**
   * Parses comma-separated list into array.
   * @param     {String}            list   unseparated text
   * @return    {ArrayList<String>}
   */
  public static ArrayList<String> parseCommaList(String list) {
    return new ArrayList(Arrays.asList(list.toLowerCase().split("\\s*,\\s*")));
  }

  /**
   * Returns a custom object with the registration status and the username and
   * display name if registered (both empty otherwise).
   * For the currently logged in User.
   * @return    {UserRegistered}
   */
  public static UserRegistered getNameCurrentUser() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    if (!userService.isUserLoggedIn()) {
      return NOT_REGISTERED;
    }

    String uid = userService.getCurrentUser().getUserId();
    return getNameFromUid(uid);
  }

  /**
   * Returns a custom object with the registration status and the username and
   * display name if registered (both empty otherwise).
   * For any User specified by uid.
   * @param     {String}          uid
   * @return    {UserRegistered}
   */
  public static UserRegistered getNameFromUid(String uid) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    if (!userService.isUserLoggedIn()) {
      return NOT_REGISTERED;
    }

    Query userQuery =
        new Query(DataUtils.USER)
            .setFilter(new FilterPredicate("uid", FilterOperator.EQUAL, uid));
    PreparedQuery storedUser = datastore.prepare(userQuery);

    if (storedUser.countEntities() == 0) {
      return NOT_REGISTERED;
    }

    Entity userEntity = storedUser.asSingleEntity();
    String username = (String)userEntity.getProperty("username");

    return new UserRegistered(true, username);
  }

  /**
   * Returns the registration status of currently logged in User.
   * @return    {boolean}
   */
  public static boolean isCurrentUserRegistered() {
    return getNameCurrentUser().registered;
  }

  /**
   * Returns if the given String contains alphanumeric characters
   * and the underscore only.
   * @param     {String}  string
   * @return    {boolean}
   */
  public static boolean hasLegalCharacters(String string) {
    return string.matches("\\A\\w*\\z");
  }


  /**
   * Returns the query containing the User entity corresponding to
   * the given username if present in database. 
   * @param     {String}        username
   * @return    {PreparedQuery}
   */
  private static PreparedQuery getUserFromUsername(String username) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Query userQuery = new Query(DataUtils.USER)
                          .setFilter(new FilterPredicate(
                              "username-lowercase", FilterOperator.EQUAL,
                              username.toLowerCase()));
    
    return datastore.prepare(userQuery);
  }

  /**
   * Returns if the given username is unique within the database.
   * @param     {String}  username
   * @return    {boolean}
   */
  public static boolean isUsernameUnique(String username) {
    return getUserFromUsername(username).countEntities() == 0;
  }

  /**
   * Returns the uid of the given username if stored in the database.
   * @param     {String}  username
   * @return    {String}
   */
  public static String getUidFromUsername(String username) {
    PreparedQuery storedUser = getUserFromUsername(username);

    if (storedUser.countEntities() == 0) {
      return null;
    }

    return (String)storedUser.asSingleEntity().getProperty("uid");
  }

  /**
   * Returns the Comment object from the given comment ID.
   * @param     {String}  cid
   * @return    {Entity}
   */
  public static Entity getCommentFromCid(String cid) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Query commentQuery = new Query(DataUtils.COMMENT)
                             .setFilter(new FilterPredicate(
                                 "comment-id", FilterOperator.EQUAL, cid));
    PreparedQuery storedComment = datastore.prepare(commentQuery);

    if (storedComment.countEntities() == 0) {
      return null;
    }

    return (Entity)storedComment.asSingleEntity();
  }

  /**
   * Returns the User object of the currently logged in user.
   * @return    {Entity}
   */
  public static Entity getCurrentUser() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    String uid = userService.getCurrentUser().getUserId();

    Query userQuery =
        new Query(DataUtils.USER)
            .setFilter(new FilterPredicate("uid", FilterOperator.EQUAL, uid));
    PreparedQuery storedUser = datastore.prepare(userQuery);

    if (storedUser.countEntities() == 0) {
      return null;
    }

    return storedUser.asSingleEntity();
  }

  private DataUtils() {}
}