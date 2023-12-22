//slider js
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export function sliderFunc() {
  const target = '.splide';
  const options = {
    mediaQuery: 'min',
    fixedWidth: '280px',
    gap: 32,
    type: 'loop',
    arrows: false,
    drag: 'free',
    flickPower: 300,
    pagination: false,

    autoScroll: {
      speed: 0.5,
      pauseOnHover: false,
      pauseOnFocus: false,
    },
  };

  const mySplide = new Splide(target, options);

  // AutoScroll拡張機能を登録
  mySplide.mount({ AutoScroll });
}
