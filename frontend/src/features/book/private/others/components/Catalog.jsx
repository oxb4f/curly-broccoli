import BookPrivateCatalogControls from '@book/private/shared/components/CatalogControls';
import BookPrivateList from './List';

const BookPrivateCatalog = ({ items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      <BookPrivateCatalogControls />
      <BookPrivateList items={items} />
    </div>
  );
};

export default BookPrivateCatalog;
