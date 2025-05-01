import { useCallback, useMemo, useRef } from 'react';

const useFrame = (expectedSize, expectedMaxSize, imageBounds) => {
  const positionRef = useRef({ x: 0, y: 0 });

  const maxSize = useMemo(() => {
    return imageBounds ? Math.min(imageBounds.width, imageBounds.height) : expectedMaxSize;
  }, [imageBounds, expectedMaxSize]);

  const boundedSize = useMemo(() => {
    if (!maxSize) return expectedSize;
    return Math.min((expectedSize * maxSize) / expectedMaxSize, maxSize);
  }, [expectedSize, maxSize, expectedMaxSize]);

  const clampCoordinate = (coordinate, min, max) => {
    return Math.min(Math.max(coordinate, min), max);
  };

  const setBoundedPosition = useCallback(
    (expectedX, expectedY) => {
      if (!imageBounds) return positionRef.current;

      const halfSize = boundedSize / 2;
      positionRef.current = {
        x: clampCoordinate(
          expectedX - halfSize,
          imageBounds.left,
          imageBounds.left + imageBounds.width - boundedSize
        ),
        y: clampCoordinate(
          expectedY - halfSize,
          imageBounds.top,
          imageBounds.top + imageBounds.height - boundedSize
        )
      };
      return positionRef.current;
    },
    [imageBounds, boundedSize]
  );

  const getBounds = useCallback(() => {
    return {
      left: positionRef.current.x,
      top: positionRef.current.y,
      size: boundedSize
    };
  }, [boundedSize]);

  return {
    boundedSize,
    maxSize,
    position: positionRef.current,
    getBounds,
    setBoundedPosition
  };
};

export default useFrame;
