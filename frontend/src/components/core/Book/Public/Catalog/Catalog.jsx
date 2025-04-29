import BookCatalogControls from './components/Controls';
import BookPublicList from '../List/List';

const BookPublicCatalog = ({ items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      <BookCatalogControls />
      <BookPublicList items={items} />
    </div>
  );
};

export default BookPublicCatalog;
