/**
 * Fetch content from data servlet and place in container.
 */
async function updateComments(isProfile) {
  let numCom = document.getElementById("num-comments");
  let numComments = numCom.options[numCom.selectedIndex].text;
  let howSort = document.getElementById("sort-type");
  let sortType = howSort.options[howSort.selectedIndex].value;
  let trLang = document.getElementById("lang-comments");
  let newLang = trLang.options[trLang.selectedIndex].value;

  let url =
    "/comments?" +
    "num-comments=" +
    numComments +
    "&sort-type=" +
    sortType +
    "&profile=" +
    isProfile +
    "&lang=" +
    newLang;

  const response = await fetch(url);
  const result = await response.json();

  const commentContainer = document.getElementById("comment-container");

  commentContainer.innerHTML = "";
  if (result.length === 0) {
    commentContainer.innerHTML = "Nothing to show".italics();
  } else {
    for (let numComment = 0; numComment < result.length; numComment++) {
      commentContainer.appendChild(createCommentElement(result[numComment]));
    }
  }
}

/**
 * Creates the comment elements.
 */
function createCommentElement(comment) {
  const nameElement = document.createElement("h3");
  nameElement.innerText = comment.username;
  nameElement.className = "commenter-name";

  const trashHtml =
    '<button class="trash-button comment-button"><img class="comment-icon" src="/images/icons/trash_icon.svg" /></button>';
  const editHtml =
    '<button class="edit-button comment-button"><img class="comment-icon" src="/images/icons/edit_icon.svg" /></button>';
  let trashDiv = document.createElement("div");
  trashDiv.className = "trash-div";
  trashDiv.innerHTML = trashHtml;
  let editDiv = document.createElement("div");
  editDiv.className = "edit-div";
  editDiv.innerHTML = editHtml;

  const timeElement = document.createElement("p");
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timeElement.innerText = moment(comment.utc)
    .tz(tz)
    .format("D MMM YYYY [at] h:mm a");
  timeElement.className = "commenter-time";

  const commentElement = document.createElement("p");
  commentElement.innerText = comment.comment;

  let commentButtonDiv = document.createElement("div");
  commentButtonDiv.className = "comment-button-div";
  if (comment.editable) {
    commentButtonDiv.appendChild(editDiv);
  }
  if (comment.deletable) {
    commentButtonDiv.appendChild(trashDiv);
  }

  let commentHeaderDiv = document.createElement("div");
  commentHeaderDiv.className = "comment";
  commentHeaderDiv.appendChild(nameElement);
  if (comment.deletable || comment.editable) {
    commentHeaderDiv.appendChild(commentButtonDiv);
  }

  let bigCommentDiv = document.createElement("div");
  bigCommentDiv.appendChild(commentHeaderDiv);
  bigCommentDiv.appendChild(timeElement);
  bigCommentDiv.appendChild(commentElement);
  return bigCommentDiv;
}

/**
 * Callback to render reCAPTCHA.
 */
function onloadCallback() {
  grecaptcha.render("recaptcha", {
    sitekey: "6LeiwsgZAAAAAAQ5UeGT05J-mkjHQtVNjhPC-zjD",
  });
}

/**
 * Only submit if a reCAPTCHA response was received.
 */
function verifyRecaptcha() {
  if (grecaptcha.getResponse().length !== 0) {
    document.getElementById("comment-form").submit();
  } else {
    alert("Please verify you are human!");
  }
}

/**
 * Create login or logout button.
 *
 * @param type  false for login, true for logout
 * @param url   link for login/logout
 */
function createLoginLogout(type, url) {
  let link = document.createElement("a");
  link.href = url;
  let buttonElement = document.createElement("button");
  buttonElement.classList.add("center", "misc-button");
  buttonElement.innerText = type ? "Logout" : "Login";
  link.appendChild(buttonElement);
  return link;
}

/**
 * Runs when the body of a login-restricted page loads.
 * Either displays login button or full page and logout button.
 */
async function onloadPage(page) {
  let url = "/users" + "?page=" + page + ".html";
  const response = await fetch(url);
  const result = await response.json();
  if (result.loggedIn) {
    if (result.registered) {
      document.getElementById("content-logged-in").style.display = "initial";
      document
        .getElementById("gatekeeper")
        .appendChild(createLoginLogout(true, result.url));
      document.getElementById("commenting-as").innerText =
        "Commenting as " + result.username;
      if (page === "comments") {
        updateComments(false);
        if (result.isAdmin) {
          document.getElementById("delete-comment-div").style.display =
            "initial";
        }
      } else if (page === "profile") {
        updateComments(true);
      }
    } else {
      document
        .getElementById("gatekeeper")
        .appendChild(createLoginLogout(true, result.url));
      document.getElementById("register-div").style.display = "initial";
    }
  } else {
    document
      .getElementById("gatekeeper")
      .appendChild(createLoginLogout(false, result.url));
  }
}

async function checkUniqueUsername() {
  let username = document.getElementById("username-input").value;
  let url = "/usernames?" + "username=" + username;

  const response = await fetch(url);
  const result = await response.json();

  document.getElementById("username-message-container").style.display = "flex";

  if (result.available) {
    document.getElementById("message-icon").src =
      "/images/icons/checkmark_icon.svg";
  } else {
    document.getElementById("message-icon").src = "/images/icons/x.svg";
  }
  document.getElementById("message-text").innerText = result.message;

  return result.available;
}

function submitUsername() {
  if (checkUniqueUsername()) {
    document.getElementById("register-form").submit();
  }
}
