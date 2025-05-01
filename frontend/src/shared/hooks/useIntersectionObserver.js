import { useCallback, useRef } from 'react';

const useIntersectionObserver = (callback, deps = []) => {
  const observer = useRef(null);

  const shouldObserve = deps.every(Boolean);

  const isVisible = useCallback((element) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, []);

  const ref = useCallback(
    (element) => {
      if (!shouldObserve) return;

      observer.current?.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) callback();
      });

      if (element) {
        observer.current.observe(element);
        if (isVisible(element)) callback();
      }
    },
    [callback, shouldObserve, isVisible]
  );

  return ref;
};

export default useIntersectionObserver;
