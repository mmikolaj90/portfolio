import { debounce } from "./utils";
import { registerObserver } from "./utils/intersectionObserver";

export default () => {
  const items: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".project-list__item")
  );

  if (!items.length) return;

  const getItemsPerRow = () => {
    const firstItemOffset = items[0].offsetTop;

    for (let index = 0; index < items.length; index++) {
      if (items[index].offsetTop > firstItemOffset) {
        return index;
      }
    }

    return 1;
  };

  const cb = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLDivElement;
      if (entry.isIntersecting) {
        target.dataset.visible = "true";
      } else {
        target.dataset.visible = "false";
      }
    });
  };

  const init = () => {
    let row = -1;
    let itemsPerRow = getItemsPerRow();

    const observer = registerObserver(cb, {
      threshold: .55
    });

    items.forEach((item, index) => {
      observer.observe(item);
      const inRow = index % itemsPerRow;

      if (inRow < 1) {
        row += 1;
      }

      item.style.setProperty("--timing-offset", row.toString());
    });
  };

  init();

  window.addEventListener("resize", debounce(init, 250));
};
