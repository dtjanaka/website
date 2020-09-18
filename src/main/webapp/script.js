/**
 * Fetch content from data servlet and place in container.
 *
 * @param isProfile loading comments on profile or comments page
 */
async function updateComments(isProfile) {
  let numCom = document.getElementById('num-comments');
  let numComments = numCom.options[numCom.selectedIndex].text;
  let howSort = document.getElementById('sort-type');
  let sortType = howSort.options[howSort.selectedIndex].value;
  let trLang = document.getElementById('lang-comments');
  let newLang = trLang.options[trLang.selectedIndex].value;

  let url =
    '/comments?' +
    'num-comments=' +
    numComments +
    '&sort-type=' +
    sortType +
    '&profile=' +
    isProfile +
    '&lang=' +
    newLang;

  if (!isProfile) {
    let username = document.getElementById('single-username').value;
    url += '&username=' + username;
  }

  const response = await fetch(url);
  const result = await response.json();

  const commentContainer = document.getElementById('comment-container');

  commentContainer.innerHTML = '';
  if (result.length === 0) {
    commentContainer.innerHTML = '<br />' + 'Nothing to show'.italics();
  } else {
    for (let numComment = 0; numComment < result.length; numComment++) {
      commentContainer.appendChild(
        createCommentElement(result[numComment], isProfile)
      );
    }
  }
}

/**
 * Creates the comment elements.
 *
 * @param comment object holding attributes of a comment
 * @param isProfile loading comments on profile or comments page
 */
function createCommentElement(comment, isProfile) {
  const nameElement = document.createElement('h3');
  nameElement.innerHTML = isProfile
    ? comment.username
    : '<a class="username-link" href="javascript:void(0);" onclick="filterUsername(\'' +
      comment.username +
      '\')">' +
      comment.username +
      '</a>';
  nameElement.className = 'commenter-name';

  const trashHtml =
    '<button class="trash-button comment-button"><img class="comment-icon" src="/images/icons/trash_icon.svg" /></button>';
  const editHtml =
    '<button class="edit-button comment-button"><img class="comment-icon" src="/images/icons/edit_icon.svg" /></button>';
  let trashDiv = document.createElement('div');
  trashDiv.className = 'trash-div';
  trashDiv.innerHTML = trashHtml;
  let editDiv = document.createElement('div');
  editDiv.className = 'edit-div';
  editDiv.innerHTML = editHtml;

  const timeContainer = document.createElement('div');
  const timeElement = document.createElement('p');
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timeElement.innerText = moment(comment.utc)
    .tz(tz)
    .format('D MMM YYYY [at] h:mm a');
  timeContainer.className = 'commenter-time';
  timeContainer.appendChild(timeElement);
  if (comment.edited) {
    const editedElement = document.createElement('div');
    editedElement.innerHTML = 'Edited'.italics();
    editedElement.className = 'edited-comment';
    timeContainer.appendChild(editedElement);
  }

  const commentElement = document.createElement('p');
  commentElement.innerText = comment.comment;
  commentElement.className = 'comment-text';

  let commentButtonDiv = document.createElement('div');
  commentButtonDiv.className = 'comment-button-div';
  if (comment.editable) {
    commentButtonDiv.appendChild(editDiv);
  }
  if (comment.deletable) {
    commentButtonDiv.appendChild(trashDiv);
  }

  let commentHeaderDiv = document.createElement('div');
  commentHeaderDiv.className = 'comment';
  commentHeaderDiv.appendChild(nameElement);
  if (comment.deletable || comment.editable) {
    commentHeaderDiv.appendChild(commentButtonDiv);
  }

  let bigCommentDiv = document.createElement('div');
  bigCommentDiv.appendChild(commentHeaderDiv);
  bigCommentDiv.appendChild(timeContainer);
  bigCommentDiv.appendChild(commentElement);
  return bigCommentDiv;
}

/**
 * Callback to render reCAPTCHA.
 */
function onloadCallback() {
  grecaptcha.render('recaptcha', {
    sitekey: '6LeiwsgZAAAAAAQ5UeGT05J-mkjHQtVNjhPC-zjD',
  });
}

/**
 * Only submit if a reCAPTCHA response was received.
 */
function verifyRecaptcha() {
  if (grecaptcha.getResponse().length !== 0) {
    document.getElementById('comment-form').submit();
  } else {
    alert('Please verify you are human!');
  }
}

/**
 * Create login or logout button.
 *
 * @param type  false for login, true for logout
 * @param url   link for login/logout
 */
function createLoginLogout(type, url) {
  let link = document.createElement('a');
  link.href = url;
  let buttonElement = document.createElement('button');
  buttonElement.classList.add('center', 'misc-button');
  buttonElement.innerText = type ? 'Logout' : 'Login';
  link.appendChild(buttonElement);
  return link;
}

/**
 * Runs when the body of a login-restricted page loads.
 * Either displays login button or full page and logout button.
 *
 * @param page  the page the function is called from
 */
async function onloadPage(page) {
  let url = '/users' + '?page=' + page + '.html';
  const response = await fetch(url);
  const result = await response.json();
  if (result.loggedIn) {
    if (result.registered) {
      document.getElementById('content-logged-in').style.display = 'initial';
      document
        .getElementById('gatekeeper')
        .appendChild(createLoginLogout(true, result.url));
      if (page === 'comments') {
        document.getElementById('commenting-as').innerHTML =
          'Commenting as <a class="username-link" href="javascript:void(0);" onclick="filterUsername(\'' +
          result.username +
          '\')">' +
          result.username +
          '</a>:';
        document.getElementById(
          'single-username'
        ).value = document.getElementById('delete-username').value = '';
        updateComments(false);
        if (result.isAdmin) {
          document.getElementById('delete-all').value = 'true';
          document.getElementById('delete-comment-div').style.display =
            'initial';
        }
      } else if (page === 'profile') {
        document.getElementById('activity-header').innerText =
          'Activity for ' + result.username;
        updateComments(true);
      }
    } else {
      document
        .getElementById('gatekeeper')
        .appendChild(createLoginLogout(true, result.url));
      document.getElementById('register-div').style.display = 'initial';
    }
  } else {
    document
      .getElementById('gatekeeper')
      .appendChild(createLoginLogout(false, result.url));
  }
}

/**
 * Returns whether a given username is legal and unique.
 */
async function checkUniqueUsername() {
  let username = document.getElementById('username-input').value;
  let url = '/usernames?' + 'username=' + username;

  const response = await fetch(url);
  const result = await response.json();

  document.getElementById('username-message-container').style.display = 'flex';

  if (result.available) {
    document.getElementById('message-icon').src =
      '/images/icons/checkmark_icon.svg';
  } else {
    document.getElementById('message-icon').src = '/images/icons/x.svg';
  }
  document.getElementById('message-text').innerText = result.message;

  return result.available;
}

/**
 * Submit handler for registration form.
 */
function submitUsername() {
  if (checkUniqueUsername()) {
    document.getElementById('register-form').submit();
  }
}

function filterUsername(username) {
  document.getElementById('single-username').value = username;
  updateComments(false);

  document.getElementById('comment-form-container').style.display = 'none';

  const singleProfileView = document.getElementById('single-profile-view');
  singleProfileView.style.display = 'initial';
  const activityHeader = document.getElementById('activity-header');
  activityHeader.innerText = 'Viewing activity for ' + username;

  document.getElementById('delete-username').value = username;
  document.getElementById('delete-all').value = 'false';
  document.getElementById('delete-comment').innerText =
    'Delete ' + username + "'s comments";
}

function backToAllComments() {
  const singleProfileView = document.getElementById('single-profile-view');
  singleProfileView.style.display = 'none';
  document.getElementById('single-username').value = document.getElementById(
    'delete-username'
  ).value = '';
  document.getElementById('delete-all').value = 'true';
  document.getElementById('delete-comment').innerText = 'Delete all comments';
  document.getElementById('comment-form-container').style.display = 'initial';
  updateComments(false);
}

function massDeleteHandler() {
  const deleteText = document.getElementById('delete-comment').innerText;
  if (
    confirm(deleteText + '?\nThis cannot be undone!') &&
    prompt(
      'Type\n"' +
        document.getElementById('delete-comment').innerText +
        '" to proceed.'
    ) === deleteText
  ) {
    document.getElementById('delete-form').submit();
  }
}
