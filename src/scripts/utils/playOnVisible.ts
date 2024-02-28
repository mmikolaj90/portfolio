import { debounce } from ".";
import { registerObserver } from "./intersectionObserver";

export const playOnVisible = () => {
  const videos = document.querySelectorAll("video");
  const noTouchQuery = window.matchMedia("(any-hover: none)");

  const setupVideos = () => {
    const videosWithoutPlaysOnVisible = Array.from(videos).filter(
      (video) => !video.dataset.playOnVisible
    );

    videosWithoutPlaysOnVisible.forEach((video) => {
      if (noTouchQuery.matches) {
        video.dataset.playOnVisible = "true";
      } else {
        video.pause();
        video.currentTime = 0;
        video.dataset.playOnVisible = "false";
      }
    });
  };

  setupVideos();
  window.addEventListener("resize", debounce(setupVideos, 200));

  const autoPlayableVideos = document.querySelectorAll(
    "[data-play-on-visible]"
  );

  const cb = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        target.play();
      } else {
        target.pause();
      }
    });
  };

  const autoplayObserver = registerObserver(cb);

  autoPlayableVideos.forEach((video) => {
    autoplayObserver.observe(video);
  });
};
