const handleHref = () => {
  const links = Array.from(document.querySelectorAll("a"));
  const currentHref = window.location.pathname;
  const homeHref = '/';

  links.filter(link => link.dataset.href === homeHref).forEach((a) => {
    if (currentHref === homeHref) {
      a.href = '#'
    } else {
      a.href = homeHref
    }
  });
};
export default () => {
  return {
    initHref: handleHref,
  };
};
