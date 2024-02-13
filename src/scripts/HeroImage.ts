import Lottie, { type AnimationItem } from "lottie-web";

interface EventFrames {
  mouseEnter: number;
  click: number;
  mouseLeave: number;
}

interface EventCallbackArgs {
  animation: AnimationItem;
  clicked?: boolean;
}

interface AnimationSetup {
  [key: string]: {
    fn: (options: EventCallbackArgs) => void;
  };
}

interface AnimationControl {
  id: string;
  sequence: AnimationSetup;
}

const closeAnimationFrames = {
  mouseEnter: 0,
  click: 30,
  mouseLeave: 60,
};

const animationSetup = (frames: EventFrames): AnimationSetup => ({
  mouseenter: {
    fn: (options) => () => {
      options.animation.playSegments(
        [frames.mouseLeave, frames.click - 1],
        true
      );
    },
  },
  mouseleave: {
    fn: (options) => () => {
      if (!options.clicked) {
        options.animation.playSegments([60, 86], true);
      }
      options.clicked = false;
    },
  },
  click: {
    fn: (options) => () => {
      options.animation.playSegments(
        [frames.click, frames.mouseLeave - 1],
        true
      );

      options.clicked = true;
    },
  },
});

const animationConfigs: AnimationControl[] = [
  {
    id: "close",
    sequence: animationSetup(closeAnimationFrames),
    // sequence: {
    //   mouseenter: {
    //     fn: (options) => {
    //       options.animation.playSegments(
    //         [closeAnimationFrames.mouseLeave, closeAnimationFrames.click - 1],
    //         true
    //       );
    //     },
    //   },
    //   mouseleave: {
    //     fn: (options) => {
    //       if (!options.clicked) {
    //         options.animation.playSegments([60, 86], true);
    //       }
    //       options.clicked = false;
    //     },
    //   },
    //   click: {
    //     fn: (options) => {
    //       options.animation.playSegments(
    //         [closeAnimationFrames.click, closeAnimationFrames.mouseLeave - 1],
    //         true
    //       );

    //       options.clicked = true;
    //     },
    //   },
    // },
  },
];

const init = () => {
  animationConfigs.forEach((config) => {
    const element = document.getElementById(config.id);
    if (!element) {
      console.error("No element");
      return;
    }

    const elementConfig = JSON.parse(
      element?.getAttribute("data-lottie-data")!
    );
    if (!elementConfig) {
      console.error("No element config");
      return;
    }

    const lottieAnimation = Lottie.loadAnimation({
      container: element, // the dom element that will contain the animation
      renderer: "svg",
      loop: elementConfig.loop ?? false,
      autoplay: elementConfig.autoplay ?? false,
      path: elementConfig.src, // the path to the animation json
      rendererSettings: {
        viewBoxOnly: true,
      },
    });

    if (!lottieAnimation) {
      console.error("No lottie animation");
      return;
    }

    let clicked = false;

    const eventNames = Object.keys(config.sequence);

    eventNames.forEach((eventName) => {
      // TODO: Verify if this is good approach?
      lottieAnimation.wrapper.addEventListener(
        eventName,
        config.sequence[eventName].fn({ animation: lottieAnimation, clicked })
      );
    });
  });
};

export default () => {
  return {
    lottieAnimationsInit: init,
  };
};
