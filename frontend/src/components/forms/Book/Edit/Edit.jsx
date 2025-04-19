import BookPhotoUpload from '../../../uploads/Book/Photo/Photo';
import useBooksService from '../../../../hooks/useBooksService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import AsyncForm from '../../../core/Form/Async/Async';
import QUERY_KEYS from '../../../../constants/queryKeys';
import ROUTES from '../../../../constants/routes';
import { useBook } from '../../../../pages/Main/Book/Provider/Provider';

const BookEditForm = ({ className = '' }) => {
  const { book, isPending } = useBook();

  // const { data: book, isPending } = useQuery({
  //   queryKey: [...QUERY_KEYS.BOOKS.PRIVATE, bookId],
  //   queryFn: () => get(bookId, false)
  // });

  // const [imageUrl, setImageUrl] = useState(null);

  // const handleOnDrop = (file) => {
  //   const objectUrl = URL.createObjectURL(file);
  //   setImageUrl(objectUrl);
  // };

  // useEffect(() => {
  //   return () => {
  //     if (imageUrl) URL.revokeObjectURL(imageUrl);
  //   };
  // }, [imageUrl]);
  const { edit } = useBooksService();
  console.log(book);

  const handleOnSubmit = async (bookData) => {
    console.log(bookData);

    await edit({ id: book.id, inputData: bookData }, { navigateTo: -1 });
  };

  const fields = {
    image: {
      element: BookPhotoUpload,
      value: book?.imageUrl,
      props: {
        className: 'size-full max-w-full max-h-full'
      }
    },
    info: {
      fields: {
        title: {
          type: 'text',
          placeholder: 'Title',
          value: book?.info?.title
        },
        author: {
          type: 'text',
          placeholder: 'Author',
          value: book?.info?.author
        },
        other: {
          fields: {
            numberOfPages: {
              type: 'number',
              placeholder: 'Number of pages',
              value: book?.info?.other?.numberOfPages
            },
            genre: {
              type: 'text',
              placeholder: 'Genre',
              value: book?.info?.other?.genre
            }
          },
          className: 'flex gap-3'
        },
        isbn: {
          type: 'text',
          placeholder: 'Isbn',
          value: book?.info?.other?.isbn
        },
        description: {
          type: 'textarea',
          placeholder: 'Description',
          className: 'min-h-40 max-h-72',
          value: book?.info?.other?.description
        },
        addBook: {
          type: 'submit',
          value: 'Edit book'
        }
      },
      className: 'flex flex-col gap-2 min-w-96'
    }
  };

  // const handleSubmit = (userData) => changeInfo(userData);

  return (
    <AsyncForm
      className="size-full max-w-4xl grid grid-rows-[60vh_auto] gap-4 xl:grid-cols-[24rem_1fr] xl:grid-rows-[90vh]"
      fields={fields}
      isLoading={isPending}
      onSubmit={handleOnSubmit}
    />
  );
};

export default BookEditForm;
