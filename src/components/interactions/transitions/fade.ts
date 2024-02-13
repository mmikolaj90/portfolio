import type { TransitionDirectionalAnimations } from "astro";

const anim = {
  old: {
    name: "bounce", // same name as the keyframe in layouts/Main
    duration: "2s",
    easing: "linear",
    fillMode: "forwards",
  },
  new: {
    name: "bounce",
    duration: "2s",
    easing: "linear",
    fillMode: "backwards",
  },
};

export const myFade: TransitionDirectionalAnimations = {
  forwards: anim,
  backwards: anim,
};
