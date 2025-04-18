import useBookCatalog from './hooks/useBookCatalog';
import BookCatalogControls from './components/Controls';
import BookList from '../List/List';

const BookCatalog = ({ items = [], isPublic = true }) => {
  const {
    editMode,
    selectedBooks,
    isAllSelected,
    toggleEditMode,
    handleSelect,
    handleSelectAll,
    handleRemove
  } = useBookCatalog(items);

  return (
    <div className="flex flex-col gap-4">
      <BookCatalogControls
        isPublic={isPublic}
        editMode={editMode}
        isAllSelected={isAllSelected}
        onEditToggle={toggleEditMode}
        onSelectAll={handleSelectAll}
        onRemove={handleRemove}
      />
      <BookList
        items={items}
        isPublic={isPublic}
        selectionEnabled={editMode}
        isItemSelected={(id) => selectedBooks.has(id)}
        onItemSelect={handleSelect}
      />
    </div>
  );
};

export default BookCatalog;
