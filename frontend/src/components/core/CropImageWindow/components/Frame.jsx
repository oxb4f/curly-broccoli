import '../ImageCropper.css';
import { useEffect } from 'react';
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
  const { boundedSize, position, getBounds, setBoundedPosition } = useFrame(
    expectedSize,
    expectedMaxSize,
    imageBounds
  );

  const { startDragging } = createDraggable(containerRef, setBoundedPosition);

  useEffect(() => {
    if (imageBounds) {
      setBoundedPosition(position.x + boundedSize / 2, position.y + boundedSize / 2);
    }
  }, [boundedSize]);

  useEffect(() => {
    onChange({ frameBounds: getBounds() });
  }, [boundedSize, position]);

  return (
    <div
      className="image-cropper__frame"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        height: `${boundedSize}px`,
        width: `${boundedSize}px`
      }}
      onPointerDown={startDragging}
    >
      <ArrowsPointingOutIcon className="image-cropper__frame-icon" />
    </div>
  );
};

export default ImageCropperFrame;
