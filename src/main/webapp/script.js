/**
 * Adds a random quote to the page.
 */
function addRandomPrequelQuote() {
  const quotes = [
    'Hello there.',
    'There’s always a bigger fish.',
    'I don’t like sand. It’s coarse and rough and irritating and it gets' +
      ' everywhere.',
    'Now this is podracing!',
    'I don’t care what universe you’re from, that’s got to hurt!',
    'I sense Count Dooku.',
    'His cells have the highest concentration of midi-chlorians I have' +
      ' seen in a life-form.',
    'I AM the Senate!',
    'I’m just a simple man, trying to make my way in the universe.',
    'This is getting out of hand! Now, there are two of them!',
  ];

  const quoteContainer = document.getElementById('content-container');

  // Pick a random different quote.
  let quote = quoteContainer.innerText;
  while (quote === quoteContainer.innerText) {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
  }

  // Add it to the page.
  quoteContainer.innerText = quote;
}

/**
 * Changes profile picture to random image.
 */
function changeProfilePic() {
  const images = [
    'pfp_def.png',
    'pfp_fr.jpg',
    'pfp_eg.jpg',
    'pfp_gr.jpg',
    'pfp_in.jpg',
    'pfp_it.jpg',
    'pfp_mtr.jpg',
    'pfp_sol.jpg',
    'pfp_uk.jpg',
    'pfp_gwc.jpg',
    'pfp_mer.jpg',
    'pfp_terra.jpg',
    'pfp_alca.jpg',
    'pfp_wh.jpg',
    'pfp_bran.jpg',
    'pfp_moai.jpg',
  ];

  // Pick random different image.
  imgElement = document.getElementById('pfp');
  let img = imgElement.src;
  while (img === imgElement.src) {
    img = images[Math.floor(Math.random() * images.length)];
    img = '/images/' + img;
  }

  // Add it to the page.
  document.getElementById('pfp-link').href = img;
  imgElement.src = img;
}

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

  const commentContainer = document.getElementById('content-container');

  //<button class="delete-comment-button"><img id="trash-icon" src="/images/trash_icon.svg" /></button>

  commentContainer.innerHTML = '';
  if (msg.length === 0) {
    commentContainer.innerHTML = 'Nothing to show'.italics();
  } else {
    for (let numComment = 0; numComment < msg.length; numComment++) {
      commentContainer.appendChild(
        createNameElement(msg[numComment].name, msg[numComment].utc)
      );
      commentContainer.appendChild(createPElement(msg[numComment].comment));
    }
  }
}

/**
 * Creates a <h3> element containing commenter name.
 */
function createNameElement(name, utc) {
  const h3Element = document.createElement('h3');
  h3Element.innerText = name;
  h3Element.className = 'commenter-name';
  const pElement = document.createElement('p');
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  pElement.innerText = moment(utc).tz(tz).format('D MMM YYYY [at] h:mm a');
  pElement.className = 'commenter-time';
  divElement = document.createElement('div');
  divElement.appendChild(h3Element);
  divElement.appendChild(pElement);
  return divElement;
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
      if (result.isAdmin) {
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
