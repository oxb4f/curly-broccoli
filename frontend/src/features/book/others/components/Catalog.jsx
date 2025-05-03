import BookOthersCatalogControls from './CatalogControls';
import BookOthersList from './List';

const BookOthersCatalog = ({ isPrivate, items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      <BookOthersCatalogControls />
      <BookOthersList items={items} isPrivate={isPrivate} />
    </div>
  );
};

export default BookOthersCatalog;
