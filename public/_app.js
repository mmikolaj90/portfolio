import barba from "@barba/core";
import gsap from "gsap";

export default () => {
  barba.init({
    transitions: [
      {
        name: "opacity-transition",
        sync: true,
        leave(data) {
          data.current.container.classList.add("fixed");
          return gsap.to(data.current.container, {
            x: "-100vw",
            duration: 2,
          });
        },
        enter(data) {
          return gsap.from(data.next.container, {
            x: "100vw",
            duration: 2,
          });
        },
      },
    ],
  });
};
