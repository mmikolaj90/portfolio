// Add all required callbacks before load
import barba from "@barba/core";
import gsap from "gsap";

/* Overall strategy:
Make sure that all individual pieces are controlled by corresponding component.
Whole page has to be routed by barba.js if we wanna make a consistent reloads.
Supported framing should be added within constrains of barba.js custom closure control.

Proposed flow:
1. Enter page register all sudgested component interactions / calculations make possible to rewrite it,
Barba behaves like standard prefetch rerenders, it switches pages between reloads
2. On each subsequent redirect we should relaunch all scripts on page, this will add a big root control object
*/
// Window scrolling
// window.scrollTo({
//   top: 0,
//   left: 0,
//   behavior: "smooth",
// });

// barba.hooks.before(() => {
//   // Register all actions here
//   barba.wrapper.classList.add("is-animating");
// });

// barba.hooks.after(() => {
//   barba.wrapper.classList.remove("is-animating");
//   handleHref();
// });

const animationDuration = 1.75;

const barbaInit = () => {
  barba.init({
    transitions: [
      {
        name: "opacity-transition",
        sync: true,
        before(data) {
          data.next.container.classList.add("next");
        },
        leave(data) {
          data.current.container.classList.add("leaving");
          return gsap.to(data.current.container, {
            duration: animationDuration,
          });
        },
        beforeEnter(data) {
          data.current.container.classList.add("current", "fixed");
        },
        enter(data) {
          setTimeout(() => {
            data.next.container.classList.add("entering");
          }, 1);
  
          setTimeout(() => {
            // document.body.classList.add("entering-lines");
          }, 200);
          return gsap.from(data.next.container, {
            duration: animationDuration,
          });
        },
        afterEnter(data) {
          data.next.container.classList.remove("entering", "next");
          data.current.container.classList.remove("leaving", "current");
          // document.body.classList.remove("entering-lines");
        },
      },
    ],
  });
}


export default () => {
  return {
    barba,
    barbaInit,
    before: barba.hooks.beforeLeave,
    after: barba.hooks.after,
  }
}