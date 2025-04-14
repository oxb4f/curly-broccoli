import * as bookApi from '../services/api/book';
import { uploadImage } from '../services/api/image';
import { useNavigate } from 'react-router';
import ROUTES from '../constants/routes';

const useBookService = () => {
  const navigate = useNavigate();

  const get = async (id, isPublic) => {
    return isPublic ? await bookApi.getPublicBook(id) : await bookApi.getPrivateBook(id);
  };

  const getAll = async (isPublic) => {
    return isPublic ? await bookApi.getPublicBooks() : await bookApi.getPrivateBooks();
  };

  const create = async (inputData) => {
    const responseImage = await uploadImage({ binaryImage: inputData.image });
    console.log(responseImage);

    const response = await bookApi.createBook({ ...inputData, imageUrl: responseImage.imageUrl });
    console.log(response);
    // navigate(ROUTES.MAIN.ROOT, { replace: true });
  };

  const edit = async (id, inputData) => {
    const { image, ...rest } = inputData;

    const responseImage =
      image instanceof Blob ? await uploadImage({ binaryImage: image }) : { imageUrl: image };

    console.log(id);
    console.log(inputData);

    const response = await bookApi.editBook(id, {
      ...rest,
      ...(responseImage.imageUrl && responseImage)
    });
    return response;
  };

  return { get, getAll, create, edit };
};

export default useBookService;
