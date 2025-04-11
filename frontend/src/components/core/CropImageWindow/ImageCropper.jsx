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
    <div className={`flex flex-col-reverse gap-1 justify-end ${className}`}>
      <input
        type="range"
        className="peer appearance-none w-full rounded-xl accent-pr-main bg-pr-bg-secondary cursor-pointer transition-all duration-300  
        focus:rounded-t-none"
        min={MIN_RANGE_VALUE}
        max={MAX_RANGE_VALUE}
        step={10}
        value={rangeValue}
        onChange={handleRangeChange}
      />
      <ImageCropperWindow
        imageUrl={imageUrl}
        rangeValue={rangeValue}
        maxRangeValue={MAX_RANGE_VALUE}
        onCropData={handleOnCropData}
        className="size-[36rem] rounded-md peer-focus:rounded-b-none transition-all duration-300"
      />
    </div>
  );
};

export default ImageCropper;
