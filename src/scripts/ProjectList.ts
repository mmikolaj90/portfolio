export default () => {
    const items: HTMLDivElement[] = Array.from(
      document.querySelectorAll(".project-list__item")
    );

    let row = -1;
    let itemsPerRow = 3;
    items.forEach((item, index) => {
      const inRow = index % itemsPerRow;

      if (inRow < 1) {
        row += 1;
      }

      item.style.setProperty("--timing-offset", row.toString());
    });
  };