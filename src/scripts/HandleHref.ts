const handleHref = () => {
  const links = Array.from(document.querySelectorAll("a"));
  const currentHref = window.location.href;

  links.forEach((a) => {
    if (a.href == currentHref) {
      a.classList.add("events-disabled");
    } else {
      a.classList.remove("events-disabled");
    }
  });
};
export default () => {
  return {
    initHref: handleHref,
  };
};
