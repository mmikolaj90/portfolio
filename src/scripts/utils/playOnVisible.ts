export const registerObserver = (
  cb: (entries?: unknown) => void,
  options?: IntersectionObserverInit | undefined
) => {
  const defaultOptions = {
    root: document.body,
    rootMargin: "0px",
    threshold: 1.0,
    ...options,
  };

  return new IntersectionObserver(cb, defaultOptions);
};
