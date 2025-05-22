import BookOthersCatalogControls from './CatalogControls';
import BookOthersList from './List';

const BookOthersCatalog = ({ isPrivate, items = [], className = '' }) => {
  return (
    <div className={`flex flex-col gap-4 py-4 ${className}`}>
      <BookOthersCatalogControls />
      <BookOthersList items={items} isPrivate={isPrivate} />
    </div>
  );
};

export default BookOthersCatalog;
