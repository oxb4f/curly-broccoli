import BookPrivateCatalogControls from './components/Controls';
import BookPrivateList from '../List/List';

const BookPrivateCatalog = ({ items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      <BookPrivateCatalogControls />
      <BookPrivateList items={items} />
    </div>
  );
};

export default BookPrivateCatalog;
