import { useCallback, useRef, useState } from 'react';
import Canvas from '../../Canvas/Canvas';
import ImageCropperFrame from './Frame';

const ImageCropperWindow = ({
  imageUrl,
  rangeValue,
  maxRangeValue,
  onCropData,
  className = ''
}) => {
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
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        '--frame-x': '0px',
        '--frame-y': '0px',
        '--max-frame-size': '0px',
        '--frame-scale': 0
      }}
      ref={containerRef}
    >
      <Canvas imageUrl={imageUrl} className="size-full" onImageLoad={handleOnImageLoad} />
      {imageBounds && (
        <ImageCropperFrame
          containerRef={containerRef}
          imageBounds={imageBounds}
          expectedSize={rangeValue}
          expectedMaxSize={maxRangeValue}
          onChange={handleOnFrameChange}
        />
      )}
    </div>
  );
};

export default ImageCropperWindow;
