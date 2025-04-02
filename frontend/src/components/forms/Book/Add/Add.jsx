import useUserService from '@/hooks/useUserService';
import Form from '../../../core/Form/Form';
import BookPhoto from '../../../../components/core/Book/Photo/Photo';
import DropZone from '../../../../components/core/DropZone/DropZone';
import { useState, useEffect } from 'react';
import useReactiveForm from '../../../core/Form/hooks/useReactiveForm';
import BookPhotoUpload from '../../../uploads/Book/Photo/Photo';

const AddBookForm = ({ className = '' }) => {
  // const { changeInfo } = useUserService();

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

  const handleOnSubmit = (bookData) => {
    console.log({ ...bookData });
  };

  const fields = {
    photo: {
      element: BookPhotoUpload
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
        description: {
          type: 'textarea',
          placeholder: 'Description'
        },
        addBook: {
          type: 'submit',
          value: 'Add book'
        }
      },
      className: 'py-10 flex flex-col gap-5 min-w-96'
    }
  };

  // const handleSubmit = (userData) => changeInfo(userData);

  return (
    <Form
      className="max-w-4xl w-full h-full grid grid-cols-[auto_1fr] gap-4"
      fields={fields}
      onSubmit={handleOnSubmit}
    />
  );
};

export default AddBookForm;
