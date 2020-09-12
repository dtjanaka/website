function addMarqueeListeners() {
  const marqueeHeader = document.getElementById('dvd-header');
  const withMarquee = document.getElementById('with-marquee');

  marqueeHeader.addEventListener('mouseover', () => {
    marqueeHeader.style.marginBottom = 0;
    withMarquee.style.display = 'initial';
  });
  marqueeHeader.addEventListener('mouseout', () => {
    marqueeHeader.style.marginBottom = marqueeHeader.style.marginTop;
    withMarquee.style.display = 'none';
  });
}

function widgetsOnLoad() {
  inversePaint('/images/angular.png', 256, 256);
  resizeMarquee();
  addMarqueeListeners();
}

function widgetsOnResize() {
  resizeMarquee();
  addMarqueeListeners();
}

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function resizeMarquee() {
  if (isMobile.any()) {
    document.getElementById('dvd-logo-screensaver').style.display = 'none';
    return;
  }

  let scaleFactor = 0.4;
  if (window.innerWidth <= 600) {
    scaleFactor = 1;
  } else if (window.innerWidth <= 1000) {
    scaleFactor = 0.75;
  }
  let width = (document.getElementById('up-down').width = Math.floor(
    scaleFactor * window.innerWidth
  ));
  document.getElementById('up-down').height = Math.floor(0.5625 * width);
  let container = document.getElementById('dvd-logo-screensaver');
  let content = container.innerHTML;
  container.innerHTML = content;
}
