export default () => {
  const imageVideos = Array.from(
    document.querySelectorAll(".image-video-switch")
  ) as HTMLLinkElement[];

  if (!imageVideos.length) return;

  const getVideoFromTile = (imageVideoElement: HTMLLinkElement) =>
    imageVideoElement.querySelector("video");

  imageVideos.forEach((imageVideo) => {
    const video = getVideoFromTile(imageVideo);

    if (!video) return;

    imageVideo?.addEventListener("mouseenter", () => {
      video.play();
    });

    imageVideo?.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
};
