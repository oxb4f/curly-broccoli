import '../CropImageWindow.css';
import { useEffect, useImperativeHandle } from 'react';
import { ArrowsPointingOutIcon } from '@heroicons/react/20/solid';
import useFrame from '../hooks/useFrame';
import createDraggable from '../../../../utils/createDraggable';

const CropImageWindowFrame = ({ innerRef, containerRef, imageBounds, frameSize, maxFrameSize }) => {
  const { frameRelativeSize, framePosition, getFrameBounds, setFramePosition } = useFrame(
    frameSize,
    maxFrameSize,
    imageBounds
  );

  useImperativeHandle(innerRef, () => ({
    getFrameBounds
  }));

  const { startDragging } = createDraggable(containerRef, setFramePosition);

  useEffect(() => {
    if (imageBounds) {
      setFramePosition(
        framePosition.x + frameRelativeSize / 2,
        framePosition.y + frameRelativeSize / 2
      );
    }
  }, [frameRelativeSize]);

  return (
    <div
      className="crop-image-window__frame"
      style={{
        transform: `translate(${framePosition.x}px, ${framePosition.y}px)`,
        height: `${frameRelativeSize}px`,
        width: `${frameRelativeSize}px`
      }}
      onPointerDown={startDragging}
    >
      <ArrowsPointingOutIcon className="crop-image-window__icon" />
    </div>
  );
};

export default CropImageWindowFrame;
