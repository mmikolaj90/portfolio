interface ElementWithDatasetHref extends Element {
  dataset: {
    href: string;
  };
}

const handleHref = () => {
  const currentHref = window.location.pathname;
  const links = Array.from(
    document.querySelectorAll("nav a")
  ) as ElementWithDatasetHref[];

  const onActive = (event: Event) => {
    event.preventDefault();
    return;
  };

  links.forEach((link: ElementWithDatasetHref) => {
    if (link.dataset.href === currentHref) {
      link.addEventListener("click", onActive);
    }
  });
};
export default () => {
  return {
    initHref: handleHref,
  };
};
