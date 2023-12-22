import { gsap, ScrollTrigger } from 'gsap/all';
import Lenis from '@studio-freight/lenis';

export function scrollAnimeFunc() {
  gsap.registerPlugin(ScrollTrigger);

  //lenis スムーズスクロール
  const lenis = new Lenis({
    duration: 3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  //ローディングアニメーション
  window.addEventListener('load', loader);

  function loader() {
    const TLLOAD = gsap.timeline();
    //タイムライン
    TLLOAD.to('.c-loading', {
      autoAlpha: 0,
      duration: 1,
      ease: 'expo.out',
    }).fromTo(
      '.c-header',
      {
        autoAlpha: 0,
        y: -30,
      },
      {
        autoAlpha: 1,
        y: 0,

        duration: 0.5,
      }
    );

    // 文字アニメーション
    function animateText(selector, startY) {
      const headings = gsap.utils.toArray(selector);
      headings.forEach((item) => {
        var text = item.textContent;
        item.innerHTML = '';
        text.split('').forEach(function (c) {
          item.innerHTML += '<span>' + c + '</span>';
        });

        //タイムライン
        TLLOAD.fromTo(
          item.children,
          {
            opacity: 0,
            scale: 2,
            y: startY,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            delay: 0.05,
            stagger: {
              grid: [10, 20],
              from: 'end',
              axis: 'x',
              amount: 0.5,
            },
            ease: 'expo.out',
            duration: 0.8,
          },
          'start'
        );
      });
    }
    //文字アニメーション関数の呼び出し
    animateText('.c-hero-text__top', -80);
    animateText('.c-hero-text__bottom', 80);

    //タイムライン
    TLLOAD.fromTo(
      '.c-scroll',
      {
        autoAlpha: 0,
        y: '100%',
      },
      {
        autoAlpha: 1,
        y: 0,

        duration: 0.5,
      }
    );
  }
  //スクロールに連動するskew animation
  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter('.skewElem', 'skewY', 'deg'),
    clamp = gsap.utils.clamp(-5, 5); //傾き

  ScrollTrigger.create({
    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / -300);
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 1,
          ease: 'power3',
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    },
  });

  gsap.set('.skewElem', {
    transformOrigin: 'right center',
    force3D: true,
  });

  //マウスストーカー

  const spotlight = document.querySelector('.c-spotlight');
  const targetClassName = 'spotlightElem';
  let hoverTimer;

  function updateSpotlightBackground(e) {
    const targetElement = e.target.closest(`.${targetClassName}`);
    let backgroundStyle;
    let rgbaValue = 0.7;

    clearTimeout(hoverTimer);

    if (targetElement) {
      // クラスが見つかった場合
      // 5秒後に rgbaValue を0に変更する
      hoverTimer = setTimeout(() => {
        rgbaValue = 0;
        backgroundStyle = `radial-gradient(80px 80px at ${e.clientX}px ${e.clientY}px, transparent, rgba(255,241,236,${rgbaValue}) 90px, rgba(0,0,0 ,${rgbaValue}) 100px)`;
        gsap.to(spotlight, {
          duration: 1,
          background: backgroundStyle,
          ease: 'power3',
        });
      }, 700);

      backgroundStyle = `radial-gradient(80px 80px at ${e.clientX}px ${e.clientY}px, transparent, rgba(255,241,236,${rgbaValue}) 90px, rgba(0,0,0 ,${rgbaValue}) 100px)`;
    } else {
      // クラスが見つからなかった場合
      backgroundStyle = `radial-gradient(30px 30px at ${e.clientX}px ${e.clientY}px, transparent, rgba(255,255,255,0.3) 40px, rgba(0,0,0,0) 50px)`;
    }

    // GSAPを使用して背景を更新
    gsap.to(spotlight, {
      duration: 1,
      background: backgroundStyle,
      ease: 'power3',
    });
  }

  document.addEventListener('mousemove', updateSpotlightBackground);

  //scaleX+フェードインアニメ
  const scaleXelem = gsap.utils.toArray('.scalexElem');
  scaleXelem.forEach((item) => {
    gsap.fromTo(
      item,
      {
        autoAlpha: 0,
        y: 20,
        x: -10,
      },
      {
        autoAlpha: 1,
        y: 0,
        x: 0,
        delay: 0.1,
        ease: 'bounce.out',
        duration: 1.5,
        scrollTrigger: {
          trigger: item,
          scrub: 4,
          start: 'top 80%',
          end: '+=200',
        },
      }
    );
  });

  //scaleY+フェードインアニメ
  const scaleYelem = gsap.utils.toArray('.scaleyElem');
  scaleYelem.forEach((item) => {
    gsap.fromTo(
      item,
      {
        autoAlpha: 1,
        y: 20,
        x: -10,
        scaleY: 0,
      },
      {
        scaleY: 1,
        autoAlpha: 1,
        y: 0,
        x: 0,
        delay: 0.1,
        ease: 'bounce.out',
        duration: 1.5,
        scrollTrigger: {
          trigger: item,
          scrub: 4,
          start: 'top 80%',
          end: '+=200',
        },
      }
    );
  });

  // 帯フェードインアニメ
  const skew = gsap.utils.toArray('.c-bg-elem');
  skew.forEach((item) => {
    gsap.fromTo(
      item,
      { scale: 1, x: 0 },
      {
        x: '100%',
        delay: 0.1,
        ease: 'circ.out',
        duration: 1,
        scrollTrigger: {
          trigger: item,
          scrub: 3,
          start: 'top 70%',
          end: '+=500',
        },
      }
    );
  });
}
