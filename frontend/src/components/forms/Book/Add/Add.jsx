import './Add.css';
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
    textFields: {
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
    }
  };

  // const handleSubmit = (userData) => changeInfo(userData);

  return <Form className="add-book-form" fields={fields} onSubmit={handleOnSubmit} />;
};

export default AddBookForm;
