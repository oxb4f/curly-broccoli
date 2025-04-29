const BookPrivateCatalogControls = ({
  isOwn,
  isSelectionEnabled,
  isAllSelected,
  toggleSelectionCallback,
  selectAllCallback,
  removeBooksCallback
}) => {
  const controlButtonClasses = 'p-2 rounded-md bg-pr-bg-secondary hover:bg-pr-bg-tertiary';

  return (
    <div className="flex justify-end gap-2">
      {isSelectionEnabled ? (
        <>
          <button className={controlButtonClasses} onClick={selectAllCallback}>
            {isAllSelected ? 'Unselect all' : 'Select all'}
          </button>
          <button className={controlButtonClasses} onClick={removeBooksCallback}>
            Remove
          </button>
          <button className={controlButtonClasses} onClick={toggleSelectionCallback}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className={controlButtonClasses}>Filter</button>
          {isOwn && (
            <button className={controlButtonClasses} onClick={toggleSelectionCallback}>
              Edit all
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BookPrivateCatalogControls;
