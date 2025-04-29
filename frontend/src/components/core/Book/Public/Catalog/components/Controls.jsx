const BookPublicCatalogControls = () => {
  const controlButtonClasses = 'p-2 rounded-md bg-pr-bg-secondary hover:bg-pr-bg-tertiary';

  return (
    <div className="flex justify-end gap-2">
      <button className={controlButtonClasses}>Filter</button>
    </div>
  );
};

export default BookPublicCatalogControls;
