import DropZone from '../../../../components/core/DropZone/DropZone';
import { useParams } from 'react-router';
import photo from '@/assets/images/profile-photo2.jpg';
import { useState } from 'react';
import BookPhoto from '../../../../components/core/Book/Photo/Photo';
import BookEditForm from '../../../../components/forms/Book/Edit/Edit';

const BookEditPage = () => {
  // const params = useParams();

  return (
    <section className="size-full py-10 flex justify-center">
      <BookEditForm />
    </section>
  );
};

export default BookEditPage;
