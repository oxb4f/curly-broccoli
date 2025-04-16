import * as bookApi from '../services/api/book';
import { uploadImage } from '../services/api/image';
import { useNavigate } from 'react-router';
import ROUTES from '../constants/routes';

const useBookService = () => {
  const navigate = useNavigate();

  const get = async (id, isPublic) => {
    return isPublic ? await bookApi.getPublicBook(id) : await bookApi.getPrivateBook(id);
  };

  const getAll = async (isPublic, params) => {
    return isPublic ? await bookApi.getPublicBooks(params) : await bookApi.getPrivateBooks(params);
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

  const remove = async (id) => {
    await bookApi.removeBook(id);
    navigate(ROUTES.MAIN.ROOT, { replace: true });
  };

  const add = async (id) => {
    await bookApi.addBook(id);
    navigate(`${ROUTES.MAIN.BOOK.PRIVATE}/${id}`, { replace: true });
  };

  return { get, getAll, create, edit, remove, add };
};

export default useBookService;
