import { mergeCn } from '@shared/utils';
import BookOthersCatalogControls from './CatalogControls';
import BookOthersList from './List';

const BookOthersCatalog = ({ isPrivate, items = [], className = '' }) => {
  return (
    <div className={mergeCn('size-full flex flex-col gap-4', className)}>
      <BookOthersCatalogControls />
      <BookOthersList items={items} isPrivate={isPrivate} />
    </div>
  );
};

export default BookOthersCatalog;
