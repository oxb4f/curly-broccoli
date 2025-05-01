import { useEffect, useRef } from 'react';

const useUnmount = (callback, deps = []) => {
  const isUnmounting = useRef(false);

  useEffect(() => {
    isUnmounting.current = false;
    return () => {
      isUnmounting.current = true;
    };
  }, []);

  useEffect(
    () => () => {
      if (isUnmounting.current) {
        callback();
      }
    },
    [isUnmounting.current, ...deps]
  );
};

export default useUnmount;
