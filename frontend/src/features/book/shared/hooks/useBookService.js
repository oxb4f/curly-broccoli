import { useQueryClient } from '@tanstack/react-query';
import * as bookApi from '../services/api/book';
import { uploadImage } from '@shared/services/api/image';
import useNavigatedMutation from '@app/query/hooks/useNavigatedMutation';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { useSession } from '@app/providers/SessionProvider';

const useBookService = () => {
  const queryClient = useQueryClient();
  const { user } = useSession();

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
    onSuccess: (bookData, variables) => {
      console.log(variables);

      queryClient.setQueryData([...QUERY_KEYS.BOOKS.PRIVATE.BOOK, bookData.id], (oldBookData) => {
        if (!oldBookData) return;

        return {
          ...bookData,
          userId: user.id
        };
      });

      queryClient.setQueryData(QUERY_KEYS.USERS.OWN, (oldUserData) => {
        if (!oldUserData || !Object.keys(variables.inputData).includes('isRead')) return;
        console.log(oldUserData, bookData);

        return {
          ...oldUserData,
          stats: {
            ...oldUserData.stats,
            readBooksCount: oldUserData.stats.readBooksCount + (bookData.stats.isRead ? 1 : -1)
          }
        };
      });

      queryClient.setQueryData([...QUERY_KEYS.BOOKS.PRIVATE.LIST, user.id], (oldBookList) => {
        if (!oldBookList?.pages) return;

        return {
          ...oldBookList,
          pages: oldBookList.pages.map((page) => ({
            ...page,
            books: page.books.map((book) => (book.id === bookData.id ? bookData : book))
          }))
        };
      });
    }
  });

  const { mutateAsync: remove } = useNavigatedMutation({
    mutationFn: bookApi.removeBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.BOOKS.PRIVATE.LIST, user.id],
        exact: true
      });
    }
  });

  const { mutateAsync: add } = useNavigatedMutation({
    mutationFn: bookApi.addBook,
    onSuccess: (newBookData, publicBookId) => {
      console.log(newBookData);
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.BOOKS.PUBLIC.BOOK, publicBookId],
        exact: true
      });
      // queryClient.setQueryData([...QUERY_KEYS.BOOKS.PUBLIC, publicBookId], (oldBookData) => {
      //   console.log(oldBookData);
      //   console.log(bookData);
      // });
    }
  });

  return { create, edit, remove, add };
};

export default useBookService;
