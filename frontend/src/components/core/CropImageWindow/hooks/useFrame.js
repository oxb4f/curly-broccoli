import { useCallback, useState, useMemo } from 'react';

const useFrame = (expectedSize, expectedMaxSize, imageBounds) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const getBoundedSize = (expectedSize, imageBounds, expectedMaxSize) => {
    if (!imageBounds) return expectedSize;
    return expectedSize * (Math.min(imageBounds.width, imageBounds.height) / expectedMaxSize);
  };

  const findCoordinate = (coordinate, min, max) => {
    return Math.min(Math.max(coordinate, min), max);
  };

  const boundedSize = useMemo(
    () => getBoundedSize(expectedSize, imageBounds, expectedMaxSize),
    [expectedSize, imageBounds]
  );

  const getBounds = useCallback(() => {
    return {
      left: position.x,
      top: position.y,
      width: boundedSize,
      height: boundedSize
    };
  }, [position, boundedSize]);

  const setBoundedPosition = (expectedX, expectedY) => {
    if (!imageBounds) return;

    setPosition({
      x: findCoordinate(
        expectedX - boundedSize / 2,
        imageBounds.left,
        imageBounds.left + imageBounds.width - boundedSize
      ),
      y: findCoordinate(
        expectedY - boundedSize / 2,
        imageBounds.top,
        imageBounds.top + imageBounds.height - boundedSize
      )
    });
  };

  return { boundedSize, position, getBounds, setBoundedPosition };
};

export default useFrame;
