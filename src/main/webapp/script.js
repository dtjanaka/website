/**
 * Fetch content from data servlet and place in container.
 *
 * @param isProfile loading comments on profile or comments page
 */
async function updateComments(isProfile) {
  const commentOptions = new FormData(document.getElementById('options-form'));
  let numComments = commentOptions.get('num-comments');
  let sortType = commentOptions.get('sort-type');
  let newLang = commentOptions.get('lang-comments');

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
    let username = commentOptions.get('single-username');
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

  const trashForm = document.createElement('form');
  trashForm.action = '/delete-comment';
  trashForm.method = 'POST';

  const cidInput = document.createElement('input');
  cidInput.type = 'hidden';
  cidInput.name = 'cid';
  cidInput.value = comment.cid;

  trashForm.appendChild(cidInput);

  const trashButton = document.createElement('button');
  trashButton.type = 'button';
  trashButton.onclick = function () {
    singleDeleteHandler(this);
  };
  trashButton.classList.add('trash-button', 'comment-button');
  trashButton.innerHTML =
    '<img class="comment-icon" src="/images/icons/trash_icon.svg" />';

  trashForm.appendChild(trashButton);

  const trashDiv = document.createElement('div');
  trashDiv.className = 'trash-div';
  trashDiv.appendChild(trashForm);

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.onclick = function () {
    editCommentHandler(this);
  };
  editButton.classList.add('edit-button', 'comment-button');
  editButton.innerHTML =
    '<img class="comment-icon" src="/images/icons/edit_icon.svg" />';
  const editDiv = document.createElement('div');
  editDiv.className = 'edit-div';
  editDiv.appendChild(editButton);

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

  const commentButtonDiv = document.createElement('div');
  commentButtonDiv.className = 'comment-button-div';
  if (comment.editable) {
    commentButtonDiv.appendChild(editDiv);
  }
  if (comment.deletable) {
    commentButtonDiv.appendChild(trashDiv);
  }

  const commentHeaderDiv = document.createElement('div');
  commentHeaderDiv.className = 'comment-header';
  commentHeaderDiv.appendChild(nameElement);
  if (comment.deletable || comment.editable) {
    commentHeaderDiv.appendChild(commentButtonDiv);
  }

  const editForm = document.createElement('form');
  editForm.action = '/edit-comment';
  editForm.method = 'POST';
  editForm.className = 'edit-form';
  editForm.style.display = 'none';
  editForm.appendChild(cidInput);

  const commentTextArea = document.createElement('textarea');
  commentTextArea.classList.add('comment-box', 'edit-comment-box');
  commentTextArea.name = 'comment';
  commentTextArea.required = true;
  editForm.appendChild(commentTextArea);

  const submitEditButton = document.createElement('button');
  submitEditButton.innerText = 'Update';
  submitEditButton.type = 'submit';
  submitEditButton.className = 'edit-box-button';

  const cancelEditButton = document.createElement('button');
  cancelEditButton.innerText = 'Cancel';
  cancelEditButton.type = 'button';
  cancelEditButton.onclick = function () {
    cancelEditHandler(this);
  };
  cancelEditButton.className = 'edit-box-button';

  const editBoxButtonDiv = document.createElement('div');
  editBoxButtonDiv.className = 'edit-buttons-div';
  editBoxButtonDiv.appendChild(submitEditButton);
  editBoxButtonDiv.appendChild(cancelEditButton);

  editForm.appendChild(editBoxButtonDiv);

  const bigCommentDiv = document.createElement('div');
  bigCommentDiv.className = 'comment';
  bigCommentDiv.appendChild(commentHeaderDiv);
  bigCommentDiv.appendChild(timeContainer);
  bigCommentDiv.appendChild(commentElement);
  bigCommentDiv.appendChild(editForm);
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
async function submitComment() {
  if (grecaptcha.getResponse().length !== 0) {
    const commentForm = document.getElementById('comment-form');
    const commentFormData = new FormData(commentForm);

    const response = await fetch('/comments', {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Upgrade-Insecure-Requests': '1',
      },
      body:
        'comment=' +
        commentFormData.get('comment') +
        '&g-recaptcha-response=' +
        commentFormData.get('g-recaptcha-response'),
    });
    const result = await response.json();

    if (result.successful) {
      commentForm.reset();
      updateComments(false);
    } else {
      alert(result.message);
    }
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
  const link = document.createElement('a');
  link.href = url;
  const buttonElement = document.createElement('button');
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
  const url = '/users' + '?page=' + page + '.html';
  const response = await fetch(url);
  const result = await response.json();
  if (result.loggedIn) {
    if (result.registered) {
      document.getElementById('content-logged-in').style.display = 'initial';
      document.getElementById('gatekeeper').innerHTML = '';
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

/**
 * Displays comments for a given user on the comments page (not the profile).
 * Hides the comment input.
 *
 * @param username the user of interest
 */
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

/**
 * Closes the display for only one user's comments and restores comment input.
 */
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

/**
 * Handles mass deletion of comments (admin action only).
 */
function massDeleteHandler() {
  const deleteText = document.getElementById('delete-comment').innerText;
  if (
    confirm(deleteText + '?\nThis cannot be undone!') &&
    prompt(
      'Type "' +
        document.getElementById('delete-comment').innerText +
        '" to proceed.'
    ) === deleteText
  ) {
    document.getElementById('delete-form').submit();
  }
}

/**
 * Handles deletion of individual comments.
 */
function singleDeleteHandler(trashButton) {
  const form = trashButton.parentElement;
  if (confirm('Delete this comment?\nThis cannot be undone!')) {
    form.submit();
  }
}

/**
 * Opens the editing form when the edit button is clicked.
 *
 * @param editButton the clicked element
 */
function editCommentHandler(editButton) {
  const comment = editButton.closest('.comment');
  const commentTextElement = comment.querySelector('.comment-text');
  const commentText = commentTextElement.innerText;
  commentTextElement.style.display = 'none';

  const editForm = comment.querySelector('.edit-form');
  editForm.querySelector('textarea').value = commentText;
  editForm.style.display = 'initial';
}

/**
 * Closes the editing form.
 *
 * @param cancelButton the clicked element
 */
function cancelEditHandler(cancelButton) {
  const comment = cancelButton.closest('.comment');
  const commentTextElement = comment.querySelector('.comment-text');
  commentTextElement.style.display = 'inline-block';
  const editForm = comment.querySelector('.edit-form');
  editForm.style.display = 'none';
}
