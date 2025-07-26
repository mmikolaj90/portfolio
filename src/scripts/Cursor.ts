const handleCursor = () => {
  const documentRoot: HTMLElement = document.querySelector(":root")!;

  const cursor = document.createElement("div");
  cursor.classList.add("cursor");

  document.body.appendChild(cursor);

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

  const updatePositionCursorRelativeToWindow = (x: number, y: number) => {
    cursorObject.left = x;
    cursorObject.top = y;
  };

  const tick = (x: number, y: number, offset: number = 0) => {
    documentRoot.style.setProperty("--cursor-left", `${x - offset}px`);
    documentRoot.style.setProperty("--cursor-top", `${y - offset}px`);
  };

  const updateCursor = (event: MouseEvent) => {
    initCursor();
    updatePositionCursorRelativeToWindow(event.clientX, event.clientY);
  };

  cursor.addEventListener("animationend", (event) => {
    cursor.classList.remove("animating-click");
  });

  window.addEventListener("mousemove", updateCursor);

  window.addEventListener("scroll", () => {
    initCursor();
    windowScrollOffsetY = window.scrollY;
  });

  window.addEventListener("click", () => {
    cursor.classList.add("is-animating", "animating-click");
  });

  const animate = () => {
    tick(cursorObject.left, cursorObject.top + windowScrollOffsetY, cursorSize);
    window.requestAnimationFrame(animate);
  };

  window.requestAnimationFrame(animate);

  const hideOn = document.querySelectorAll(".cursor-hide");

  hideOn.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("opacity-0");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("opacity-0");
    });
  });

  return {
    cursor,
  };
};

export default () => {
  return {
    initCursor: handleCursor,
  };
};
