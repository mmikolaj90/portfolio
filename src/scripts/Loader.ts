import Lottie from "lottie-web";

const loader = () => {
  document.body.classList.add("loading");

  const animInit = () => {
    const logo = document.getElementById("logo")!;
    const logoConfig = JSON.parse(logo?.getAttribute("data-lottie-data")!);

    Lottie.loadAnimation({
      container: logo, // the dom element that will contain the animation
      renderer: "svg",
      loop: logoConfig.loop ?? false,
      autoplay: logoConfig.autoplay ?? false,
      path: logoConfig.src, // the path to the animation json
      rendererSettings: {
        viewBoxOnly: true,
      },
    });
  };

  animInit();
};

export default () => {
  return {
    initLoader: loader,
    removeLoader: () => {
      setTimeout(() => {
        document.body.classList.remove("loading");
      }, 1500);
    },
  };
};
