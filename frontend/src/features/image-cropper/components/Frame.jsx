import { useCallback, useEffect } from 'react';
import { ArrowsPointingOutIcon } from '@heroicons/react/20/solid';
import useFrame from '@image-cropper/hooks/useFrame';
import createDraggable from '@image-cropper/utils/createDraggable';

const ImageCropperFrame = ({
  containerRef,
  imageBounds,
  expectedSize,
  expectedMaxSize,
  onChange
}) => {
  const { boundedSize, maxSize, position, getBounds, setBoundedPosition } = useFrame(
    expectedSize,
    expectedMaxSize,
    imageBounds
  );

  const renderPosition = useCallback(
    (offsetX, offsetY) => {
      const newPosition = setBoundedPosition(offsetX, offsetY);
      if (containerRef.current) {
        containerRef.current.style.setProperty('--frame-x', `${newPosition.x}px`);
        containerRef.current.style.setProperty('--frame-y', `${newPosition.y}px`);
      }
    },
    [containerRef, setBoundedPosition]
  );

  const updateBounds = useCallback(
    () => onChange({ frameBounds: getBounds() }),
    [getBounds, onChange]
  );

  const { startDragging } = createDraggable(containerRef, renderPosition, updateBounds);

  useEffect(() => {
    if (imageBounds) {
      containerRef.current.style.setProperty('--max-frame-size', `${maxSize}px`);
      containerRef.current.style.setProperty('--frame-scale', `${boundedSize / maxSize}`);

      renderPosition(position.x + boundedSize / 2, position.y + boundedSize / 2);
      updateBounds();
    }
  }, [imageBounds, boundedSize, containerRef, maxSize]);

  return (
    <div
      className="absolute top-0 left-0 w-(--max-frame-size) h-(--max-frame-size) translate-x-(--frame-x) translate-y-(--frame-y) scale-(--frame-scale) origin-top-left flex justify-center items-center ring-[999rem] box-border ring-pr-bg-secondary opacity-80 rounded-full bg-transparent z-50 cursor-move"
      onPointerDown={startDragging}
    >
      <ArrowsPointingOutIcon className="rotate-45 size-1/4 opacity-70" />
    </div>
  );
};

export default ImageCropperFrame;
