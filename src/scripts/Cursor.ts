const handleCursor = () => {
  const cursor = document.querySelector(".cursor");
  const cursorObject = {
    top: 0,
    left: 0,
  };

  if (!cursor) return;

  let cursorInitialized = false;
  let windowScrollOffsetY = window.scrollY;

  const zeroWindowScrollOffsetY = () => {
    windowScrollOffsetY = 0;
  };

  const initCursor = () => {
    if (!cursorInitialized) {
      cursor?.classList.add("active");
      cursorInitialized = true;
    }
  };

  const cursorSize = 20;

  const updatePositionCursor = (x: number, y: number) => {
    cursorObject.left = x;
    cursorObject.top = y;
  };

  const tick = (x: number, y: number, offset: number = 0) => {
    cursor?.setAttribute(
      "style",
      `
      left: ${x - offset}px;
      top: ${y - offset}px;
      `
    );
  };

  const updateCursor = (event: MouseEvent) => {
    zeroWindowScrollOffsetY();
    initCursor();
    updatePositionCursor(event.pageX, event.pageY);
  };

  cursor.addEventListener("animationend", (event) => {
    cursor.classList.remove("animating-click");
  });

  window.addEventListener("mousemove", updateCursor);

  // window.addEventListener("scroll", () => {
  //   initCursor();
  //   windowScrollOffsetY = window.scrollY;
  // });

  window.addEventListener("click", (e) => {
    zeroWindowScrollOffsetY();
    cursor.classList.add("is-animating", "animating-click");
  });

  const animate = () => {
    tick(cursorObject.left, cursorObject.top + windowScrollOffsetY, cursorSize);
    window.requestAnimationFrame(animate);
  };

  window.requestAnimationFrame(animate);
};

export default () => {
  return {
    initCursor: handleCursor,
  };
};
