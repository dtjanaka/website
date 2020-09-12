/**
 * Fetch content from data servlet and place in container.
 */
async function updateComments(profile) {
  let numCom = document.getElementById('num-comments');
  let numComments = numCom.options[numCom.selectedIndex].text;
  let howSort = document.getElementById('sort-type');
  let sortType = howSort.options[howSort.selectedIndex].value;
  let trLang = document.getElementById('lang-comments');
  let newLang = trLang.options[trLang.selectedIndex].value;

  let url =
    '/comments?' +
    'numComments=' +
    numComments +
    '&sortType=' +
    sortType +
    '&profile=' +
    profile +
    '&lang=' +
    newLang;

  const response = await fetch(url);
  const msg = await response.json();

  const commentContainer = document.getElementById('comment-container');

  commentContainer.innerHTML = '';
  if (msg.length === 0) {
    commentContainer.innerHTML = 'Nothing to show'.italics();
  } else {
    for (let numComment = 0; numComment < msg.length; numComment++) {
      commentContainer.appendChild(createCommentElement(msg[numComment]));
    }
  }
}

/**
 * Creates the comment elements.
 */
function createCommentElement(comment) {
  const nameElement = document.createElement('h3');
  nameElement.innerText = comment.name;
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

  const timeElement = document.createElement('p');
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timeElement.innerText = moment(comment.utc)
    .tz(tz)
    .format('D MMM YYYY [at] h:mm a');
  timeElement.className = 'commenter-time';

  const commentElement = document.createElement('p');
  commentElement.innerText = comment.comment;

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
  bigCommentDiv.appendChild(timeElement);
  bigCommentDiv.appendChild(commentElement);
  return bigCommentDiv;
}

/**
 * Creates a <p> element containing text.
 */
function createPElement(text) {
  const pElement = document.createElement('p');
  pElement.innerText = text;
  return pElement;
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
 */
async function onloadPage(page) {
  let url = '/login-status' + '?page=' + page + '.html';
  const response = await fetch(url);
  const result = await response.json();
  if (result.loggedIn) {
    document.getElementById('content-logged-in').style.display = 'initial';
    document
      .getElementById('login-logout')
      .appendChild(createLoginLogout(true, result.url));
    if (page === 'comments' || page === 'profile') {
      updateComments(page);
      if (page === 'comments' && result.isAdmin) {
        document.getElementById('delete-data-div').style.display = 'initial';
      }
    } else if (page === 'imgupload') {
      getBlobUploadUrl();
    } else if (page === 'imgmanip') {
      await populateImages();
    }
  } else {
    document
      .getElementById('login-logout')
      .appendChild(createLoginLogout(false, result.url));
  }
}

/**
 * Fetch a Blobstore upload link.
 */
async function getBlobUploadUrl() {
  const response = await fetch('/blob-upload');
  const result = await response.json();
  document.getElementById('img-upload-form').action = result;
}

/**
 * Create an image element with width 200px from a src link.
 */
function createImgElement(url) {
  let imgElement = document.createElement('img');
  imgElement.src = url;
  imgElement.classList = 'for-editing';
  imgElement.style.width = '200px';
  return imgElement;
}

/**
 * Add images from Blobstore to editing gallery.
 */
async function populateImages() {
  const response = await fetch('/blobs');
  const result = await response.json();
  for (let img = 0; img < result.length; img++) {
    document
      .getElementById('gallery')
      .appendChild(createImgElement(result[img]));
  }
}
