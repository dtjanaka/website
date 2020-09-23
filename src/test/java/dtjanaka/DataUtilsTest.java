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
import com.google.appengine.tools.development.testing.LocalUserServiceTestConfig;
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
  public void userRegisteredCurrentUser() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    Entity userEntity = new Entity(DataUtils.USER);
    String uid = userService.getCurrentUser().getUserId();
    userEntity.setProperty("uid", uid);
    userEntity.setProperty("username", "Abc");
    userEntity.setProperty("username-lowercase", "abc");
    userEntity.setProperty("last-changed", "2020-06-20T22:29:22.048Z");

    datastore.put(userEntity);

    assertEquals(1,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    UserRegistered userRegistered = DataUtils.getNameCurrentUser();

    assertEquals(true, userRegistered.registered);
    assertEquals("abc", userRegistered.username);
  }

  /**
   * User should not be registered.
   */
  @Test
  public void userNotRegisteredCurrentUser() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    UserRegistered userRegistered = DataUtils.getNameCurrentUser();

    assertEquals(false, userRegistered.registered);
    assertEquals(null, userRegistered.username);
  }

  /**
   * User should be registered.
   */
  @Test
  public void userRegisteredWithUid() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    Entity userEntity = new Entity(DataUtils.USER);
    String uid = userService.getCurrentUser().getUserId();
    userEntity.setProperty("uid", uid);
    userEntity.setProperty("username", "Abc");
    userEntity.setProperty("username-lowercase", "abc");
    userEntity.setProperty("last-changed", "2020-06-20T22:29:22.048Z");

    datastore.put(userEntity);

    assertEquals(1,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    UserRegistered userRegistered = DataUtils.getNameFromUid(uid);

    assertEquals(true, userRegistered.registered);
    assertEquals("abc", userRegistered.username);
  }

  /**
   * User should not be registered.
   */
  @Test
  public void userNotRegisteredWithUid() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    String uid = userService.getCurrentUser().getUserId();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    UserRegistered userRegistered = DataUtils.getNameFromUid(uid);

    assertEquals(false, userRegistered.registered);
    assertEquals(null, userRegistered.username);
  }

  /**
   * Alphanumeric characters and underscore are valid.
   */
  @Test
  public void alphanumAndUnderscore() {
    assertEquals(true,
                 DataUtils.hasLegalCharacters("abcABC123_"));
  }

  /**
   * Non alphanumeric characters not allowed.
   */
  @Test
  public void nonAlphanum() {
    assertEquals(false,
                 DataUtils.hasLegalCharacters("#abc123~"));
  }

  /**
   * Should check if username is unique, ignoring case.
   */
  @Test
  public void isUsernameUnique() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    Entity userEntity = new Entity(DataUtils.USER);
    String uid = userService.getCurrentUser().getUserId();
    userEntity.setProperty("uid", uid);
    userEntity.setProperty("username", "Abc");
    userEntity.setProperty("username-lowercase", "abc");
    userEntity.setProperty("last-changed", "2020-06-20T22:29:22.048Z");

    datastore.put(userEntity);

    assertEquals(true, DataUtils.isUsernameUnique("def"));
    assertEquals(false, DataUtils.isUsernameUnique("aBc"));
    assertEquals(false, DataUtils.isUsernameUnique("abc"));
  }

  /**
   * Should find the uid for a registered username, ignoring case.
   */
  @Test
  public void getUidFromUsername() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    Entity userEntity = new Entity(DataUtils.USER);
    String uid = userService.getCurrentUser().getUserId();
    userEntity.setProperty("uid", uid);
    userEntity.setProperty("username", "Abc");
    userEntity.setProperty("username-lowercase", "abc");
    userEntity.setProperty("last-changed", "2020-06-20T22:29:22.048Z");

    datastore.put(userEntity);

    assertEquals(uid, DataUtils.getUidFromUsername("Abc"));
    assertEquals(uid, DataUtils.getUidFromUsername("abc"));
    assertEquals(null, DataUtils.getUidFromUsername("abcd"));
  }

  /**
   * Should find the comment given its comment ID.
   */
  @Test
  public void getCommentFromCid() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.COMMENT)).countEntities());

    Entity commentEntity = new Entity(DataUtils.COMMENT);
    String uid = userService.getCurrentUser().getUserId();
    commentEntity.setProperty("uid", uid);
    commentEntity.setProperty("comment", "Hi");
    commentEntity.setProperty("comment-id", "xyz");
    commentEntity.setProperty("edited", "2020-06-20T22:29:22.048Z");
    commentEntity.setProperty("utc", "2020-06-20T22:29:22.048Z");

    datastore.put(commentEntity);

    assertEquals(commentEntity, DataUtils.getCommentFromCid("xyz"));
    assertEquals(null, DataUtils.getCommentFromCid("uvw"));
  }

  /**
   * Should find the current user in the database.
   */
  @Test
  public void getCurrentUser() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    UserService userService = UserServiceFactory.getUserService();

    assertEquals(0,
                 datastore.prepare(new Query(DataUtils.USER)).countEntities());

    Entity userEntity = new Entity(DataUtils.USER);
    String uid = userService.getCurrentUser().getUserId();
    userEntity.setProperty("uid", uid);
    userEntity.setProperty("username", "Abc");
    userEntity.setProperty("username-lowercase", "abc");
    userEntity.setProperty("last-changed", "2020-06-20T22:29:22.048Z");

    datastore.put(userEntity);

    assertEquals(userEntity, DataUtils.getCurrentUser());
  }
}
