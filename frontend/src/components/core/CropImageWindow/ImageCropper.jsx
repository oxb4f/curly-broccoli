import './ImageCropper.css';
import { useCallback, useImperativeHandle, useRef, useState } from 'react';
import ImageCropperWindow from './components/Window';

const ImageCropper = ({ innerRef, imageUrl, className = '' }) => {
  const MIN_RANGE_VALUE = 200;
  const MAX_RANGE_VALUE = 1000;

  const [rangeValue, setRangeValue] = useState(MIN_RANGE_VALUE);
  const cropParams = useRef(null);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleOnCropData = useCallback((data) => {
    cropParams.current = { ...cropParams.current, ...data };
  }, []);

  useImperativeHandle(innerRef, () => ({
    cropImage: async () => {
      const { cropImage, getImageBlob, imageBounds, frameBounds } = cropParams.current;

      cropImage({
        x: frameBounds.left - imageBounds.left,
        y: frameBounds.top - imageBounds.top,
        size: frameBounds.width
      });

      return await getImageBlob();
    }
  }));

  return (
    <div ref={innerRef} className={`image-cropper ${className}`}>
      <ImageCropperWindow
        imageUrl={imageUrl}
        rangeValue={rangeValue}
        maxRangeValue={MAX_RANGE_VALUE}
        onCropData={handleOnCropData}
      />

      <input
        type="range"
        className="input image-cropper__input-range"
        min={MIN_RANGE_VALUE}
        max={MAX_RANGE_VALUE}
        step={10}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default ImageCropper;
