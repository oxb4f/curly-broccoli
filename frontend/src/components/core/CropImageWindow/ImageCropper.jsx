import './ImageCropper.css';
import { useCallback, useImperativeHandle, useRef, useState } from 'react';
import ImageCropperWindow from './components/Window';

const ImageCropper = ({ innerRef, imageUrl, className = '' }) => {
  const MIN_RANGE_VALUE = 200;
  const MAX_RANGE_VALUE = 1000;

  const [rangeValue, setRangeValue] = useState(MIN_RANGE_VALUE);
  const cropParams = useRef(null);

  const handleRangeChange = useCallback((event) => {
    setRangeValue(Number(event.target.value));
  }, []);

  const handleOnCropData = useCallback((data) => {
    cropParams.current = { ...cropParams.current, ...data };
  }, []);

  useImperativeHandle(innerRef, () => ({
    cropImage: async () => {
      const { cropImage, getImageBlob, imageBounds, frameBounds } = cropParams.current;
      if (!cropImage || !getImageBlob || !imageBounds || !frameBounds) return null;

      cropImage({
        x: frameBounds.left - imageBounds.left,
        y: frameBounds.top - imageBounds.top,
        size: frameBounds.size
      });

      return await getImageBlob();
    }
  }));

  return (
    <div className={`image-cropper ${className}`}>
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
        value={rangeValue}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default ImageCropper;
