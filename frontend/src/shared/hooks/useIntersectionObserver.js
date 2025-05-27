import { useCallback, useRef } from 'react';

const useIntersectionObserver = ({
  deps = [],
  onEnter = null,
  onStick = null,
  onLeave = null,
  root = null,
  threshold = [],
  rootMargin = '0px 0px 0px 0px'
}) => {
  const observer = useRef(null);

  const isObserving = deps.every?.(Boolean);

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
      if (!isObserving) return;

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          console.log(entries[0].intersectionRatio);

          if (entries[0].intersectionRatio < 1 && onStick) onStick();
          if (entries[0].isIntersecting && onEnter) onEnter();
          if (!entries[0].isIntersecting && onLeave) onLeave();
        },
        {
          ...(onStick && { rootMargin: '-1px 0px 0px 0px', threshold: [1] }),
          root,
          rootMargin,
          threshold
        }
      );

      if (element) {
        observer.current.observe(element);
        if (isVisible(element) && onEnter) onEnter();
      }
    },
    [onEnter, isObserving, isVisible]
  );

  return ref;
};

export default useIntersectionObserver;
