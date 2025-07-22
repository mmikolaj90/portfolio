const layout = new rive.Layout({
  fit: rive.Fit.FitWidth, // Change to: rive.Fit.Contain, or Cover
  alignment: rive.Alignment.Center,
});

const toRiveInstance = (canvas) => {
  const riveInstance = new rive.Rive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    // src: "https://cdn.rive.app/animations/vehicles.riv",
    src: canvas.dataset.riveSrc,
    // Be sure to specify the correct state machine (or animation) name
    stateMachines: canvas.dataset.riveStateMachines, // Name of the State Machine to play
    canvas: canvas,
    isTouchScrollEnabled: true,
    // artboard: "Artboard" // Optionally provide the artboard to display
    layout, // This is optional. Provides additional layout control.
    autoplay: true,
    automaticallyHandleEvents: true,
    onLoad: () => {
      // Prevent a blurry canvas by using the device pixel ratio
      riveInstance.resizeDrawingSurfaceToCanvas();
      // this.riveInstance.enableFPSCounter();
    },
  });

  const riveInstanceWindowResizeEventListener = () => {
    riveInstance.resizeDrawingSurfaceToCanvas();
  };

  window.addEventListener(
    "resize",
    riveInstanceWindowResizeEventListener,
    false
  );

  const cleanup = () => {
    riveInstance.cleanup();
    window.removeEventListener(
      "resize",
      riveInstanceWindowResizeEventListener,
      false
    );
  };

  return { riveInstance, cleanup };
};

const init = () => {
  const riveCanvases = document.querySelectorAll("[data-rive-src]");
  const instances = Array.from(riveCanvases).map(toRiveInstance);

  const cleanup = () => {
    if (!instances.length) return;
    instances.forEach((instance) => instance.cleanup());
  };

  return {
    instances,
    cleanup,
  };
};

export default () => {
  return {
    init,
  };
};
