import Form from '@shared/components/form/Form';
import BookImageUpload from './ImageUpload';
import useBookService from '@book/shared/hooks/useBookService';
import BookOthersList from '@book/others/components/List';
import { quickSearchPublicBooks } from '@book/shared/services/api/book';

const BookCreateForm = ({ className = '' }) => {
  const { create } = useBookService();

  const handleOnSubmit = async (bookData) => {
    console.log(bookData.imageUrl);

    await create(bookData);
  };

  const fields = {
    image: {
      element: BookImageUpload,
      hint: 'Use your own photo or it will be default',
      props: {
        className: 'size-full max-w-full max-h-full'
      }
    },
    description: {
      fields: {
        title: {
          type: 'search',
          label: 'Title',
          queryOptions: {
            select: (data) => data.books,
            queryFn: (value) => quickSearchPublicBooks({ term: value })
          },
          children: (books) => (
            <BookOthersList
              variant="inline"
              items={books}
              className="max-h-56 px-2 py-6 overflow-y-auto"
              itemsClassName="rounded-2xl hover:bg-pr-main/10"
            />
          ),
          labelClassName: 'z-50',
          className: 'transition-all',
          dropdownClassName: 'bg-pr-main/5 backdrop-blur-md origin-top scale-x-100 transition-all'
        },
        author: {
          type: 'text',
          label: 'Author'
        },
        info: {
          fields: {
            numberOfPages: {
              type: 'number',
              label: 'Number of pages'
            },
            genre: {
              type: 'text',
              label: 'Genre'
            }
          },
          className: 'flex gap-4'
        },
        isbn: {
          type: 'text',
          label: 'Isbn'
        },
        description: {
          type: 'textarea',
          label: 'Description',
          className: 'min-h-40 max-h-72'
        },
        addBook: {
          type: 'submit',
          children: 'Add book'
        }
      },
      className: 'flex flex-col gap-2 min-w-96'
    }
  };

  // const handleSubmit = (userData) => changeInfo(userData);

  return (
    <Form
      className="size-full max-w-4xl grid grid-rows-[60vh_auto] gap-4 xl:grid-cols-[24rem_1fr] xl:grid-rows-[90vh]"
      fields={fields}
      onSubmit={handleOnSubmit}
    />
  );
};

export default BookCreateForm;
