package dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
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
   * Returns a custom object with the registration status and the username if
   * registered (null otherwise).
   * @return    {UserRegistered}
   */
  public static UserRegistered isUserRegistered() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    if (!userService.isUserLoggedIn()) {
      return new UserRegistered(false, "");
    }

    String uid = userService.getCurrentUser().getUserId();
    Query userQuery =
        new Query(DataUtils.USER)
            .setFilter(new FilterPredicate("uid", FilterOperator.EQUAL, uid));
    PreparedQuery storedUser = datastore.prepare(userQuery);

    if (storedUser.countEntities() == 0) {
      return new UserRegistered(false, "");
    }

    return new UserRegistered(
        true, (String)(storedUser.asSingleEntity().getProperty("username")));
  }

  private DataUtils() {}
}