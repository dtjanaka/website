package dtjanaka.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

/**
 * Handles new comments and returns existing comments.
 */
@WebServlet("/comments")
public class CommentServlet extends HttpServlet {
  private static final Gson gson =
      new GsonBuilder().setPrettyPrinting().create();

  private static final String COMMENT_LOGIN = gson.toJson(
      new CommentPostInfo(false, "You must be logged in to post a comment."));
  private static final String COMMENT_RECAPTCHA =
      gson.toJson(new CommentPostInfo(false, "Please verify you are human!"));
  private static final String COMMENT_LENGTH =
      gson.toJson(new CommentPostInfo(false, "A comment cannot be empty."));
  private static final String COMMENT_SUCCESS =
      gson.toJson(new CommentPostInfo(true, "Comment successfully posted."));

  private static final String ALL_COMMENTS = "All";
  private static final String ASCENDING_COMMENTS = "asc";

  /**
   * Handles POST requests for comments.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    String comment = request.getParameter("comment");
    String token = request.getParameter("g-recaptcha-response");

    Query query = new Query("Secret").setFilter(new FilterPredicate(
        "name", FilterOperator.EQUAL, "recaptcha-comments"));

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery secret = datastore.prepare(query);

    String secretKey = (String)secret.asSingleEntity().getProperty("value");

    if (DataUtils.isEmptyParameter(comment)) {
      response.getWriter().println(COMMENT_LENGTH);
      return;
    } else if (!isValidCaptcha(secretKey, token)) {
      response.getWriter().println(COMMENT_RECAPTCHA);
      return;
    } else if (!DataUtils.isCurrentUserRegistered()) {
      response.getWriter().println(COMMENT_LOGIN);
      return;
    }

    String uid = userService.getCurrentUser().getUserId();
    String now = Instant.now().toString();

    Entity commentEntity = new Entity(DataUtils.COMMENT);
    commentEntity.setProperty("comment", comment);
    commentEntity.setProperty("uid", uid);
    commentEntity.setProperty("utc", now);
    commentEntity.setProperty(
        "comment-id", KeyFactory.keyToString(datastore.put(commentEntity)));
    commentEntity.setProperty("edited", now);

    datastore.put(commentEntity);

    response.getWriter().println(COMMENT_SUCCESS);
  }

  /**
   * Handles GET requests for comments.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("application/json");

    UserService userService = UserServiceFactory.getUserService();
    String uid = userService.getCurrentUser().getUserId();

    if (!DataUtils.isCurrentUserRegistered()) {
      response.getWriter().println(gson.toJson("Access denied."));
      return;
    }

    String numCommentsString = request.getParameter("num-comments");
    String sortType = request.getParameter("sort-type");
    String forProfileString = request.getParameter("profile");
    String newLang = request.getParameter("lang");
    String username = request.getParameter("username");
    int numComments = 10; // Show 10 comments by default
    boolean forProfile = false;

    if (DataUtils.isEmptyParameter(newLang)) {
      newLang = "en";
    }

    if (DataUtils.isEmptyParameter(sortType)) {
      sortType = "dsc";
    }

    if (DataUtils.isEmptyParameter(numCommentsString)) {
      numCommentsString = "10";
    }

    if (!numCommentsString.equals(ALL_COMMENTS)) {
      try {
        numComments = Integer.parseInt(numCommentsString);
      } catch (Exception e) {
        throw new IOException("Error parsing argument to integer.");
      }
    }

    if (DataUtils.isEmptyParameter(forProfileString)) {
      forProfileString = "false";
    }

    try {
      forProfile = Boolean.parseBoolean(forProfileString);
    } catch (Exception e) {
      throw new IOException("Error parsing argument to boolean.");
    }

    Query query = new Query(DataUtils.COMMENT)
                      .addSort("utc", sortType.equals(ASCENDING_COMMENTS)
                                          ? SortDirection.ASCENDING
                                          : SortDirection.DESCENDING);

    if (forProfile) {
      Filter profileFilter =
          new FilterPredicate("uid", FilterOperator.EQUAL, uid);

      query.setFilter(profileFilter);
    } else if (!DataUtils.isEmptyParameter(username)) {
      String uidFromUsername = DataUtils.getUidFromUsername(username);
      if (uidFromUsername != null) {
        Filter usernameFilter =
            new FilterPredicate("uid", FilterOperator.EQUAL, uidFromUsername);

        query.setFilter(usernameFilter);
      }
    }

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery storedComments = datastore.prepare(query);

    Translate translate = TranslateOptions.getDefaultInstance().getService();

    ArrayList<Comment> comments = new ArrayList<Comment>();
    int maxComments = 0;
    for (Entity entity : storedComments.asIterable()) {
      String commentUid = (String)entity.getProperty("uid");
      UserRegistered userRegistered = DataUtils.getNameFromUid(commentUid);
      String comment = (String)entity.getProperty("comment");
      if (!newLang.equals("en")) {
        try {
          Translation translation = translate.translate(
              comment, Translate.TranslateOption.targetLanguage(newLang));
          comment = translation.getTranslatedText();
        } catch (Exception e) {
          throw new IOException("Error translating to" + newLang + ".");
        }
      }
      String utc = (String)entity.getProperty("utc");

      String cid = (String)entity.getProperty("comment-id");

      boolean editable = ((String)entity.getProperty("uid")).equals(uid);
      boolean deletable = userService.isUserAdmin() || editable;

      boolean edited = !(((String)(entity.getProperty("edited"))).equals(utc));

      maxComments++;
      comments.add(new Comment(userRegistered, comment, utc, cid, deletable,
                               editable, edited));
      if (!numCommentsString.equals(ALL_COMMENTS) &&
          maxComments >= numComments) {
        break;
      }
    }

    // TODO: known issue where translated comments display &#39; instead of '
    Gson gsonDisableEscaping =
        new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create();
    String jsonComments = gsonDisableEscaping.toJson(comments);
    response.getWriter().println(jsonComments);
  }

  /**
   * Handles server-side reCAPTCHA verification.
   * https://stackoverflow.com/questions/47622506/how-to-validate-recaptcha-v2-java-servlet
   * @param     {String}    secretKey
   * @param     {String}    response
   * @return    {boolean}
   */
  public synchronized boolean isValidCaptcha(String secretKey, String response)
      throws IOException {
    try {
      String url = "https://www.google.com/recaptcha/api/siteverify",
             params = "secret=" + secretKey + "&response=" + response;

      HttpURLConnection http =
          (HttpURLConnection) new URL(url).openConnection();
      http.setDoOutput(true);
      http.setRequestMethod("POST");
      http.setRequestProperty(
          "Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      OutputStream out = http.getOutputStream();
      out.write(params.getBytes("UTF-8"));
      out.flush();
      out.close();

      InputStream in = http.getInputStream();
      BufferedReader br =
          new BufferedReader(new InputStreamReader(in, "UTF-8"));

      StringBuilder sb = new StringBuilder();
      int cp;
      while ((cp = br.read()) != -1) {
        sb.append((char)cp);
      }
      JSONObject json = new JSONObject(sb.toString());
      in.close();

      return json.getBoolean("success");
    } catch (Exception e) {
      throw new IOException("Error verifying reCAPTCHA.");
    }
  }
}