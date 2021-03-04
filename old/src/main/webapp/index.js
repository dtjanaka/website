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
  quoteContainer.style.display = 'block';

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
    'pfp_adt.jpg',
    'pfp_alca.jpg',
    'pfp_alm.jpg',
    'pfp_arch.jpg',
    'pfp_ben.jpg',
    'pfp_bran.jpg',
    'pfp_cap.jpg',
    'pfp_chr.jpg',
    'pfp_col.jpg',
    'pfp_eif.jpg',
    'pfp_fbdn.jpg',
    'pfp_gwc.jpg',
    'pfp_itza.jpg',
    'pfp_ltop.jpg',
    'pfp_lux.jpg',
    'pfp_mer.jpg',
    'pfp_moai.jpg',
    'pfp_mtr.jpg',
    'pfp_nd.jpg',
    'pfp_ndl.jpg',
    'pfp_ngra.jpg',
    'pfp_par.jpg',
    'pfp_pyr.jpg',
    'pfp_shng.jpg',
    'pfp_soh.jpg',
    'pfp_sol.jpg',
    'pfp_stb.jpg',
    'pfp_taj.jpg',
    'pfp_terra.jpg',
    'pfp_ulu.jpg',
    'pfp_ver.jpg',
    'pfp_wh.jpg',
  ];

  // Pick random different image.
  imgElement = document.getElementById('pfp');
  let img = imgElement.src;
  while (img === imgElement.src) {
    img = images[Math.floor(Math.random() * images.length)];
    img = '/images/pfps/' + img;
  }

  // Add it to the page.
  document.getElementById('pfp-link').href = img;
  imgElement.src = img;
}
