const BookCatalogControls = ({
  isPublic,
  editMode,
  isAllSelected,
  onEditToggle,
  onSelectAll,
  onRemove
}) => {
  const controlButtonClasses = 'p-2 rounded-md bg-pr-bg-secondary hover:bg-pr-bg-tertiary';

  return (
    <div className="flex justify-end gap-2">
      {editMode ? (
        <>
          <button className={controlButtonClasses} onClick={onSelectAll}>
            {isAllSelected ? 'Unselect all' : 'Select all'}
          </button>
          <button className={controlButtonClasses} onClick={onRemove}>
            Remove
          </button>
          <button className={controlButtonClasses} onClick={onEditToggle}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className={controlButtonClasses}>Filter</button>
          {!isPublic && (
            <button className={controlButtonClasses} onClick={onEditToggle}>
              Edit all
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BookCatalogControls;
