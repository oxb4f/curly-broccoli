import './CropImageWindow.css';
import { useCallback, useImperativeHandle, useRef, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import CropImageWindowFrame from './components/Frame';

const CropImageWindow = ({ innerRef, imageUrl, frameSize, maxFrameSize }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  const [imageBounds, setImageBounds] = useState(null);

  const handleOnImageLoad = useCallback((bounds) => {
    setImageBounds(bounds);
  }, []);

  useImperativeHandle(innerRef, () => ({
    cropImage: () => {
      const frameBounds = frameRef.current.getFrameBounds();

      canvasRef.current.cropImage({
        x: frameBounds.left - imageBounds.left,
        y: frameBounds.top - imageBounds.top,
        size: frameBounds.width
      });

      return canvasRef.current.getImageUrl();
    }
  }));

  return (
    <div className="crop-image-window" ref={containerRef}>
      <Canvas
        innerRef={canvasRef}
        imageUrl={imageUrl}
        className="crop-image-window__canvas"
        onImageLoad={handleOnImageLoad}
      />
      <CropImageWindowFrame
        innerRef={frameRef}
        containerRef={containerRef}
        imageBounds={imageBounds}
        frameSize={frameSize}
        maxFrameSize={maxFrameSize}
      />
    </div>
  );
};

export default CropImageWindow;
