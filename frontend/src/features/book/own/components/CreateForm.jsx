import Form from '@shared/components/form/Form';
import BookImageUpload from './ImageUpload';
import useBookService from '@book/shared/hooks/useBookService';

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
          type: 'text',
          placeholder: 'Title'
        },
        author: {
          type: 'text',
          placeholder: 'Author'
        },
        info: {
          fields: {
            numberOfPages: {
              type: 'number',
              placeholder: 'Number of pages'
            },
            genre: {
              type: 'text',
              placeholder: 'Genre'
            }
          },
          className: 'flex gap-3'
        },
        isbn: {
          type: 'text',
          placeholder: 'Isbn'
        },
        description: {
          type: 'textarea',
          placeholder: 'Description',
          className: 'min-h-40 max-h-72'
        },
        addBook: {
          type: 'submit',
          value: 'Add book'
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
