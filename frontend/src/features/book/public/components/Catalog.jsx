import BookPublicCatalogControls from './CatalogControls';
import BookPublicList from './List';

const BookPublicCatalog = ({ items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      <BookPublicCatalogControls />
      <BookPublicList items={items} />
    </div>
  );
};

export default BookPublicCatalog;
