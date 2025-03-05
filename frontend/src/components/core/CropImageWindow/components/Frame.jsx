import '../ImageCropper.css';
import { useCallback, useEffect } from 'react';
import { ArrowsPointingOutIcon } from '@heroicons/react/20/solid';
import useFrame from '../hooks/useFrame';
import createDraggable from '../../../../utils/createDraggable';

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
    <div className="image-cropper__frame" onPointerDown={startDragging}>
      <ArrowsPointingOutIcon className="image-cropper__frame-icon" />
    </div>
  );
};

export default ImageCropperFrame;
