document.getElementById("menu").addEventListener("click", showMenuBar);
document.getElementById("search-button").addEventListener("click", showSearchBar);
document.getElementById("close").addEventListener("click", closeMenuBar);

var animationShowMenuBar = anime({
  easing: 'easeOutExpo',
  autoplay: false,
  duration: 250,
  targets: '#menu-bar',
  height: ['0px', '130px'],
  width: '100%'
});

var animationShowMenuBarPhone = anime({
  easing: 'easeOutExpo',
  autoplay: false,
  targets: '#menu-bar',
  height: ['0vh', '50vh'],
  width: ['0%', '100%'],
  duration: 500,
});

var animationAppearShowMenuBarPhone = anime({
  easing: 'easeOutExpo',
  autoplay: false,
  targets: "#close, #category, .menu-bar-link-container, #menu-bar-search",
  translateY: [20, 0],
  opacity: [0, 1],
  delay: anime.stagger(150)
});

var animationAppearShowMenuBar = anime({
  easing: 'easeOutExpo',
  autoplay: false,
  targets: ".menu-bar-link-container",
  translateY: [20, 0],
  opacity: [0, 1],
  delay: anime.stagger(150)
});

var animationShowSearchBar = anime.timeline({
  easing: 'easeOutExpo',
  autoplay: false,
  duration: 250
});
animationShowSearchBar
  .add({
    targets: '#search-bar',
    height: ['0px', '80px'],
    duration: 150
  })
  .add({
    delay: 200,
    targets: '.input-search, .submit-search',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 100
  });

var ShowMenuBar = false;
var ShowMenuBarPhone = false;
var ShowSearchBar = false;
var PhoneSize = window.matchMedia('(min-width:320px) and (max-width: 480px)');

PhoneSize.addListener(fixMenuBarHeight);

function fixMenuBarHeight() {
  if (PhoneSize.matches) {
    if (ShowMenuBar == true) {
      document.getElementById('menu-bar').style.display = "flex";
      document.getElementById('menu-bar').style.height = "50vh";
      document.getElementById('menu-bar').style.zIndex = "1000";
    } else {
      document.getElementById('menu-bar').style.height = "0vh";
      document.getElementById('menu-bar').style.display = "none";
      document.getElementById('menu-bar').style.zIndex = "-1000";
    }
  } else {
    document.getElementById('menu-bar').style.display = "flex";
    if (ShowMenuBarPhone == true) {
      ShowMenuBar = !ShowMenuBar;
      console.log('jembutan.. ShowMenuBar : ' + ShowMenuBar + ', ShowMenuBarPhone :' + ShowMenuBarPhone);
      document.getElementById('menu-bar').style.height = "130px";
    } else {
      document.getElementById('menu-bar').style.height = "0px";
    }
  }
}

function showMenuBar() {
  ShowMenuBarPhone = !ShowMenuBarPhone;
  console.log('Dari func showMenuBar sub PhoneSize, nilai ShowMenuBarPhone : ' + ShowMenuBarPhone);
  if (ShowMenuBarPhone == true && ShowMenuBar == true) {
    console.log('mlaku bos');
    ShowMenuBarPhone = false;
    ShowMenuBar = false;
    animationShowMenuBar.reverse();
    animationShowMenuBar.play();
  } else if (PhoneSize.matches) {
    if (ShowMenuBarPhone == true) {
      console.log('ASU');
      document.getElementById('menu-bar').style.display = "flex";
      document.getElementById('menu-bar').style.zIndex = "1000";
      animationShowMenuBarPhone.play();
      animationShowMenuBarPhone.finished.then(() => {
        animationShowMenuBarPhone.reverse();
        animationAppearShowMenuBarPhone.play();
        animationAppearShowMenuBarPhone.finished.then(() => {
          animationAppearShowMenuBarPhone.reverse();
        })
      });
    } else {
      console.log('TAI');
      document.getElementById('menu-bar').style.display = "flex";
      document.getElementById('menu-bar').style.zIndex = "1000";
      animationAppearShowMenuBarPhone.play();
      animationAppearShowMenuBarPhone.finished.then(() => {
        animationAppearShowMenuBarPhone.reverse();
        animationShowMenuBarPhone.play();
        animationShowMenuBarPhone.finished.then(() => {
          animationShowMenuBarPhone.reverse();
        })
      });
    };
  } else if (!PhoneSize.matches) {
    ShowMenuBar = !ShowMenuBar;
    if (ShowSearchBar == true) {
      animationShowSearchBar.play();
      animationShowMenuBar.finished.then(() => {
        animationShowMenuBar.reverse();
      })
      ShowSearchBar = !ShowSearchBar;
    }

    if (ShowMenuBar == true) {
      animationShowMenuBar.play();
      animationShowMenuBar.finished.then(() => {
        animationShowMenuBar.reverse();
        animationAppearShowMenuBar.play();
        animationAppearShowMenuBar.finished.then(() => {
          animationAppearShowMenuBar.reverse();
        })
      })
    } else {
      animationAppearShowMenuBar.play();
      animationAppearShowMenuBar.finished.then(() => {
        animationAppearShowMenuBar.reverse();
        animationShowMenuBar.play();
        animationShowMenuBar.finished.then(() => {
          animationShowMenuBar.reverse();
        })
      })
    }
  }
};

function closeMenuBar() {
  ShowMenuBarPhone = false;
  ShowMenuBar = false;
  animationShowMenuBar.play();
  animationShowMenuBar.finished.then(() => {
    animationShowMenuBar.reverse();
  });
  animationAppearShowMenuBarPhone.play();
  animationAppearShowMenuBarPhone.finished.then(() => {
    animationAppearShowMenuBarPhone.reverse();
    animationShowMenuBarPhone.play();
    animationShowMenuBarPhone.finished.then(() => {
      document.getElementById('menu-bar').style.display = "none";
      document.getElementById('menu-bar').style.zIndex = "-1000";
      document.getElementById('menu-bar').style.height = "0px";
      animationShowMenuBarPhone.reverse();
    });
  });
};

function showSearchBar() {
  ShowSearchBar = !ShowSearchBar;
  if (ShowMenuBar == true) {
    animationShowMenuBar.play();
    ShowMenuBar = !ShowMenuBar;
  }
  animationShowSearchBar.play();
  animationShowSearchBar.finished.then(() => {
    animationShowSearchBar.reverse();
  })
  console.log('Dari func showSearchBar sub else PhoneSize, nilai ShowMenuBar : ' + ShowMenuBar + ', nilai ShowSearchBar : ' + ShowSearchBar);
};

// Animasi menu bar error padahal kalau di tes ke 1 object saja apply animasinya aman
// Code dibawah ini hanya untuk testing dan terbukti error tanpa sebab pada animasi menu bar nya

/*
document.getElementById("tes").addEventListener("click", tesHero);

var tes = anime({
  targets: '#tes',
  opacity: [0, 1],
  translateY: [20, 0],
  easing: 'easeOutExpo',
  autoplay: false,
  duration: 100
});

function tesHero() {
  console.log('clicked');
  tes.play();
  tes.finished.then(() => {
    tes.reverse();
  })
};
*/