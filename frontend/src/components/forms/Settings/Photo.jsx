import './Settings.css';
import { useState, useRef, useCallback, useMemo } from 'react';
import Form from '../../core/Form/Form';
import CropImageWindow from '../../core/CropImageWindow/CropImageWindow';
import ROUTES from '../../../constants/routes';
import FormNavigation from '../../navigations/Form/Form';
import useUserService from '@/hooks/useUserService';

const MIN_RANGE_VALUE = 200;
const MAX_RANGE_VALUE = 1000;

const PhotoSettingsForm = ({ imageUrl }) => {
  const { changePhoto } = useUserService();
  const [rangeValue, setRangeValue] = useState(MIN_RANGE_VALUE);

  const cropImageRef = useRef(null);

  const backNavigation = {
    text: 'cancel',
    to: ROUTES.SETTINGS.ROOT
  };

  const handleOnSubmit = async () => {
    const croppedCanvas = cropImageRef.current.cropImage();

    // console.log(croppedCanvas);
    const response = await changePhoto({ canvas: croppedCanvas });
    console.log(response);
  };

  const handleRangeChange = useCallback((value) => {
    setRangeValue(value);
  }, []);

  const fields = useMemo(
    () => ({
      controlButtons: {
        cancel: {
          element: <FormNavigation item={backNavigation} />
        },
        confirm: {
          type: 'submit',
          value: 'confirm'
        }
      },
      cropImageWindow: {
        element: (
          <CropImageWindow
            innerRef={cropImageRef}
            imageUrl={imageUrl}
            frameSize={rangeValue}
            maxFrameSize={MAX_RANGE_VALUE}
          />
        )
      },
      frameSizeRange: {
        type: 'range',
        min: MIN_RANGE_VALUE,
        max: MAX_RANGE_VALUE,
        step: 10,
        value: MIN_RANGE_VALUE,
        onChange: handleRangeChange
      }
    }),
    [rangeValue, imageUrl, handleRangeChange]
  );

  return <Form className="photo-settings__form" fields={fields} onSubmit={handleOnSubmit} />;
};

export default PhotoSettingsForm;
