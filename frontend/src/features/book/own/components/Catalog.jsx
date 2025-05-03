import { useState } from 'react';
import useBookSelection from '../hooks/useBooksSelection';
import BookOwnCatalogControls from '@book/own/components/CatalogControls';
import BookOwnList from './List';
import useBookService from '@book/shared/hooks/useBookService';

const BookOwnCatalog = ({ items = [] }) => {
  const { selectedBooks, isAllSelected, select, selectAll } = useBookSelection(items);

  const { remove } = useBookService();
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
      <BookOwnCatalogControls
        isSelectionEnabled={editMode}
        isAllSelected={isAllSelected}
        toggleSelectionCallback={toggleEditMode}
        selectAllCallback={selectAll}
        removeBooksCallback={handleRemove}
      />
      <BookOwnList
        items={items}
        isSelectionEnabled={editMode}
        isItemSelected={(id) => selectedBooks.has(id)}
        onItemSelect={select}
      />
    </div>
  );
};

export default BookOwnCatalog;
