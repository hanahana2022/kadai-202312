import { sliderFunc } from './components/slider.js';
import { scrollAnimeFunc } from './components/animation.js';

// slider
sliderFunc();
//gsap animation
scrollAnimeFunc();

//headerの高さを超えたらmix-blende-modeを追加し識字性を上げる処理
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.c-header');
  var headerHeight = header.offsetHeight;

  function checkHeaderPosition() {
    if (window.scrollY > headerHeight) {
      header.classList.add('blend');
    } else {
      header.classList.remove('blend');
    }
  }
  window.addEventListener('scroll', checkHeaderPosition);
});
