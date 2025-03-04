import '../ImageCropper.css';
import { useCallback, useRef, useState } from 'react';
import Canvas from '../../Canvas/Canvas';
import ImageCropperFrame from './Frame';

const ImageCropperWindow = ({ imageUrl, rangeValue, maxRangeValue, onCropData }) => {
  const containerRef = useRef(null);
  const [imageBounds, setImageBounds] = useState(null);

  const handleOnImageLoad = useCallback(
    (imageOptions) => {
      setImageBounds(imageOptions.imageBounds);

      if (onCropData) {
        onCropData(imageOptions);
      }
    },
    [onCropData]
  );

  const handleOnFrameChange = useCallback(
    (frameOptions) => {
      if (onCropData) {
        onCropData(frameOptions);
      }
    },
    [onCropData]
  );

  return (
    <div className="image-cropper__window" ref={containerRef}>
      <Canvas
        imageUrl={imageUrl}
        className="image-cropper__canvas"
        onImageLoad={handleOnImageLoad}
      />
      <ImageCropperFrame
        containerRef={containerRef}
        imageBounds={imageBounds}
        expectedSize={rangeValue}
        expectedMaxSize={maxRangeValue}
        onChange={handleOnFrameChange}
      />
    </div>
  );
};

export default ImageCropperWindow;
