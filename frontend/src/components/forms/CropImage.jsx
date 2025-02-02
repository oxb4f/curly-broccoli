import { useState, useRef } from 'react';
import Form from '../core/Form/Form';
import CropImageWindow from '../core/CropImageWindow/CropImageWindow';

const CropImageForm = ({ imageUrl }) => {
  const minRangeValue = 200;
  const maxRangeValue = 1000;
  const [rangeValue, setRangeValue] = useState(minRangeValue);

  const cropImageRef = useRef(null);

  const handleOnSubmit = () => {
    const croppedImageUrl = cropImageRef.current.cropImage();

    let tempLink = document.createElement('a');
    let fileName = `image-cropped.jpg`;
    tempLink.download = fileName;
    tempLink.href = croppedImageUrl;
    tempLink.click();
  };

  const fields = [
    [
      {
        name: 'cancel',
        type: 'button',
        value: 'cancel'
      },
      {
        name: 'confirm',
        type: 'submit',
        value: 'confirm'
      }
    ],
    {
      name: 'cropImageWindow',
      element: (
        <CropImageWindow
          innerRef={cropImageRef}
          imageUrl={imageUrl}
          frameSize={rangeValue}
          maxFrameSize={maxRangeValue}
        />
      )
    },
    {
      name: 'frameSizeRange',
      type: 'range',
      min: minRangeValue,
      max: maxRangeValue,
      step: 10,
      value: minRangeValue,
      onChange: (value) => setRangeValue(value)
    }
  ];

  return <Form fields={fields} onSubmit={handleOnSubmit} />;
};

export default CropImageForm;
