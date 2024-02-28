export const registerObserver = (
  cb: IntersectionObserverCallback,
  options?: IntersectionObserverInit | undefined
) => {
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    ...options,
  };

  return new IntersectionObserver(cb, defaultOptions);
};
