package dtjanaka.servlets;

import static org.junit.Assert.assertEquals;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.mock.web.MockHttpServletRequest;

@RunWith(JUnit4.class)
public final class DataUtilsTest {

  private MockHttpServletRequest request;

  private final LocalServiceTestHelper helper =
      new LocalServiceTestHelper(new LocalUserServiceTestConfig(),
                                 new LocalDatastoreServiceTestConfig())
          .setEnvIsLoggedIn(true)
          .setEnvEmail("abc@xyz.com")
          .setEnvAuthDomain("gmail.com");

  @Before
  public void setUp() {
    helper.setUp();
    request = new MockHttpServletRequest();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  /**
   * A null parameter is considered empty.
   */
  @Test
  public void nullParameter() {
    String nullString = null;
    assertEquals(true, DataUtils.isEmptyParameter(nullString));
  }

  /**
   * An empty string in a parameter is considered empty.
   */
  @Test
  public void emptyParameter() {
    String emptyString = "";
    assertEquals(true, DataUtils.isEmptyParameter(emptyString));
  }

  /**
   * Duplicate strings should be removed.
   */
  @Test
  public void duplicateStrings() {
    ArrayList<String> duplicates =
        new ArrayList<String>(Arrays.asList("a", "a", "b", "", "b", "c"));
    assertEquals(new ArrayList<String>(Arrays.asList("a", "b", "", "c")),
                 DataUtils.withDuplicatesRemoved(duplicates));
  }

  /**
   * Each substring separated by a comma should become an element in the output
   * array.
   */
  @Test
  public void commaList() {
    String commaList =
        "johndoe@gmail.com, janedoe@gmail.com,jack@gmail.com,,jill@gmail.com";
    assertEquals(new ArrayList<String>(
                     Arrays.asList("johndoe@gmail.com", "janedoe@gmail.com",
                                   "jack@gmail.com", "", "jill@gmail.com")),
                 DataUtils.parseCommaList(commaList));
  }

  /**
   * User should be registered.
   */
  @Test
  public void userRegistered() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    Entity userEntity = new Entity(DataUtils.USER);
    String uid = userService.getCurrentUser().getUserId();
    userEntity.setProperty("uid", uid);
    userEntity.setProperty("username", "abc");

    datastore.put(userEntity);

    assertEquals(1,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    assertEquals(new UserRegistered(true, "abc"), DataUtils.isUserRegistered());
  }

  /**
   * User should not be registered.
   */
  @Test
  public void userNotRegistered() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    assertEquals(new UserRegistered(false, ""), DataUtils.isUserRegistered());
  }
}
