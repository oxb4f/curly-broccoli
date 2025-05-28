import FilterButton from '@shared/components/ui/buttons/Filter';

const BookOwnCatalogControls = ({
  isSelectionEnabled,
  isAllSelected,
  toggleSelectionCallback,
  selectAllCallback,
  removeBooksCallback,
  openFilters,
  className = ''
}) => {
  const controlButtonClasses = 'p-2 rounded-md bg-pr-bg-secondary hover:bg-pr-bg-tertiary';

  return (
    <div className={`flex justify-end gap-2 ${className}`}>
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
          <FilterButton className="self-center size-8" onClick={openFilters} />

          <button className={controlButtonClasses} onClick={toggleSelectionCallback}>
            Edit all
          </button>
        </>
      )}
    </div>
  );
};

export default BookOwnCatalogControls;
