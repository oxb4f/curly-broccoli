import * as bookApi from '../services/api/book';
import { uploadImage } from '../services/api/image';
import useNavigatedMutation from './useNavigatedMutation';
import { useQueryClient } from '@tanstack/react-query';
import QUERY_KEYS from '../constants/queryKeys';

const useBooksService = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: create } = useNavigatedMutation({
    mutationFn: async (inputData) => {
      const responseImage = await uploadImage({ binaryImage: inputData.image });
      console.log(responseImage);

      const response = await bookApi.createBook({ ...inputData, imageUrl: responseImage.imageUrl });
      console.log(response);
    }
  });

  const { mutateAsync: edit } = useNavigatedMutation({
    mutationFn: async ({ id, inputData }) => {
      console.log(id, inputData);

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
    },
    onSuccess: (bookData) => {
      console.log(bookData);
      queryClient.invalidateQueries([...QUERY_KEYS.BOOKS.PRIVATE, bookData.id]);
      // queryClient.setQueryData(QUERY_KEYS.BOOKS.PRIVATE, (oldBookData) => ({
      //   ...oldBookData,
      //   ...bookData
      // }));
    }
  });

  const { mutateAsync: remove } = useNavigatedMutation({
    mutationFn: bookApi.removeBook,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.BOOKS.PRIVATE);
    }
  });

  const add = async (id) => {
    await bookApi.addBook(id);
  };

  return { create, edit, remove, add };
};

export default useBooksService;
