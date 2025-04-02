import DropZone from '../../../../components/core/DropZone/DropZone';
import { useParams } from 'react-router';
import photo from '@/assets/images/profile-photo2.jpg';
import { useState } from 'react';
import BookPhoto from '../../../../components/core/Book/Photo/Photo';
import AddBookForm from '../../../../components/forms/Book/Add/Add';

const BookAddPage = () => {
  // const params = useParams();

  return (
    <section className="size-full flex justify-center">
      <AddBookForm />
      {/* <div className="book-add-page__photo-container">
        {imageUrl ? (
          <BookPhoto imageUrl={imageUrl} className="book-add-page__photo" />
        ) : (
          <DropZone onDropHandler={handleOnDrop} className="book-add-page__drop-zone" />
        )}
      </div> */}
    </section>
  );
};

export default BookAddPage;
