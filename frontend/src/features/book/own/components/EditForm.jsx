import BookImageUpload from './ImageUpload';
import useBookService from '@book/shared/hooks/useBookService';
import AsyncForm from '@shared/components/form/AsyncForm';
import { useBook } from '@app/providers/BookProvider';

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
  const { edit } = useBookService();
  console.log(book);

  const handleOnSubmit = async (bookData) => {
    console.log(bookData);

    await edit({ id: book.id, inputData: bookData }, { navigateTo: -1 });
  };

  const fields = {
    image: {
      element: BookImageUpload,
      value: book?.imageUrl,
      props: {
        className: 'size-full max-w-full max-h-full'
      }
    },
    info: {
      fields: {
        title: {
          type: 'text',
          label: 'Title',
          value: book?.info?.title
        },
        author: {
          type: 'text',
          label: 'Author',
          value: book?.info?.author
        },
        other: {
          fields: {
            numberOfPages: {
              type: 'number',
              label: 'Number of pages',
              value: book?.info?.other?.numberOfPages
            },
            genre: {
              type: 'text',
              label: 'Genre',
              value: book?.info?.other?.genre
            }
          },
          className: 'flex gap-3'
        },
        isbn: {
          type: 'text',
          label: 'Isbn',
          value: book?.info?.other?.isbn
        },
        description: {
          type: 'textarea',
          label: 'Description',
          className: 'min-h-40 max-h-72',
          value: book?.info?.other?.description
        },
        addBook: {
          type: 'submit',
          children: 'Edit book'
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
