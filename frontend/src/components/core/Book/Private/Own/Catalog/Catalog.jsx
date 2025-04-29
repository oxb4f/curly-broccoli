import useBooksSelection from './hooks/useBooksSelection';
import BookPrivateCatalogControls from '../../Catalog/components/Controls';
import BookPrivateOwnList from '../List/List';
import { useState } from 'react';
import useBooksService from '../../../../../../hooks/useBooksService';

const BookPrivateOwnCatalog = ({ items = [] }) => {
  const { selectedBooks, isAllSelected, select, selectAll } = useBooksSelection(items);

  const { remove } = useBooksService();
  const [editMode, setEditMode] = useState(false);

  const handleRemove = async () => {
    await Promise.all(Array.from(selectedBooks).map((bookId) => remove(bookId)));
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4">
      <BookPrivateCatalogControls
        isOwn
        isSelectionEnabled={editMode}
        isAllSelected={isAllSelected}
        toggleSelectionCallback={toggleEditMode}
        selectAllCallback={selectAll}
        removeBooksCallback={handleRemove}
      />
      <BookPrivateOwnList
        items={items}
        isSelectionEnabled={editMode}
        isItemSelected={(id) => selectedBooks.has(id)}
        onItemSelect={select}
      />
    </div>
  );
};

export default BookPrivateOwnCatalog;
