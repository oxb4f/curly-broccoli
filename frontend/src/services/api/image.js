import api from './api';
import { prepareRequest, processResponse } from '../../utils/dataTransformers';

const uploadImage = async (inputData) => {
  const requestPayload = prepareRequest(inputData, 'images', 'upload');
  console.log(requestPayload);

  const response = await api.post('images', requestPayload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return processResponse(response, 'images');
};

export { uploadImage };
