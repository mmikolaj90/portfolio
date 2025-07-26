import gsap from "gsap";

// Function for Mouse Move Scale Change (Jelly Effect)
// function getScale(diffX: number, diffY: number) {
//   const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
//   return Math.min(distance / 100, 0.25);
// }

// Function For Mouse Movement Angle in Degrees (Jelly Effect)
// function getAngle(diffX: number, diffY: number) {
//   return (Math.atan2(diffY, diffX) * 180) / Math.PI;
// }

// Variables
const elasticCursor = document.getElementById("jelly-cursor");
const pos = { x: 0, y: 0 };
const vel = { x: 0, y: 0 };
let targetPos = { x: 0, y: 0 };
// let isHoveringClickable = false;

// Use gsap.quickSetter for optimized property setting
const setX = gsap.quickSetter(elasticCursor, "x", "px");
const setY = gsap.quickSetter(elasticCursor, "y", "px");
// const setRotation = gsap.quickSetter(elasticCursor, "rotate", "deg");
// const setScaleX = gsap.quickSetter(elasticCursor, "scaleX");
// const setScaleY = gsap.quickSetter(elasticCursor, "scaleY");
// const setOpacity = gsap.quickSetter(elasticCursor, "opacity");

// Update position and rotation (without affecting the scale)
function update() {
  // const rotation = getAngle(vel.x, vel.y);
  // const scale = getScale(vel.x, vel.y);

  // Apply jelly-like effect (position and rotation), keeping scale separate
  setX(pos.x);
  setY(pos.y);
  // setRotation(rotation);

  // If not hovering, apply the jelly scale effect
  // if (!isHoveringClickable) {
  //   setScaleX(1 + scale);
  //   setScaleY(1 - scale);
  // }
}

// Animation loop
function animate() {
  const speed = 0.35;

  // Update cursor's position based on targetPos
  pos.x += (targetPos.x - pos.x) * speed;
  pos.y += (targetPos.y - pos.y) * speed;
  vel.x = targetPos.x - pos.x;
  vel.y = targetPos.y - pos.y;

  update();
  requestAnimationFrame(animate);
}

const handleHideOn = (cursor: Element) => {
  const hideOn = document.querySelectorAll(".cursor-hide");

  hideOn.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("opacity-0");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("opacity-0");
    });
  });
};

const handleCursor = () => {
  const documentRoot: HTMLElement = document.querySelector(":root")!;

  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  cursor.id = 'jelly-cursor';

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

  handleHideOn(cursor);

  return {
    cursor,
  };
};

export default () => {
  return {
    initCursor: handleCursor,
  };
};
