import { useCallback, useState, useMemo } from 'react';

const useFrame = (rawFrameSize, maxRawFrameSize, imageBounds) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const getSize = (rawFrameSize, imageBounds, maxRawFrameSize) => {
    if (!imageBounds) return rawFrameSize;
    return rawFrameSize * (Math.min(imageBounds.width, imageBounds.height) / maxRawFrameSize);
  };

  const findCoordinate = (coordinate, min, max) => {
    return Math.min(Math.max(coordinate, min), max);
  };

  const size = useMemo(
    () => getSize(rawFrameSize, imageBounds, maxRawFrameSize),
    [rawFrameSize, imageBounds]
  );

  const getFrameBounds = useCallback(() => {
    return {
      left: position.x,
      top: position.y,
      width: size,
      height: size
    };
  }, [position, size]);

  const setFramePosition = (mouseX, mouseY) => {
    if (!imageBounds) return;

    setPosition({
      x: findCoordinate(
        mouseX - size / 2,
        imageBounds.left,
        imageBounds.left + imageBounds.width - size
      ),
      y: findCoordinate(
        mouseY - size / 2,
        imageBounds.top,
        imageBounds.top + imageBounds.height - size
      )
    });
  };

  return { frameRelativeSize: size, framePosition: position, getFrameBounds, setFramePosition };
};

export default useFrame;
