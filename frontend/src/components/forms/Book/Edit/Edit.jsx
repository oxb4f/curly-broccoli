import Form from '../../../core/Form/Form';
import BookPhoto from '../../../core/Book/Photo/Photo';
import DropZone from '../../../core/DropZone/DropZone';
import { useState, useEffect } from 'react';
import useReactiveForm from '../../../core/Form/hooks/useReactiveForm';
import BookPhotoUpload from '../../../uploads/Book/Photo/Photo';
import useBookService from '../../../../hooks/useBookService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import AsyncForm from '../../../core/Form/Async/Async';

const BookEditForm = ({ className = '' }) => {
  // const { changeInfo } = useUserService();
  const { bookId } = useParams();
  const { get } = useBookService();

  const {
    data: book,
    isPending,
    error,
    refetch
  } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => get(bookId, false)
  });

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

    await edit(bookId, bookData);
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
