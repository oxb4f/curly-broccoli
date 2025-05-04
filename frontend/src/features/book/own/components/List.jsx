import BookOwnCard from '@book/own/components/Card';
import BookCreateLink from './CreateLink';

const BookOwnList = ({
  items = [],
  isSelectionEnabled,
  isItemSelected,
  onItemSelect,
  className = ''
}) => {
  return (
    <ul
      className={`w-full grid grid-cols-1 gap-4 
        md:grid-cols-2 
        lg:grid-cols-4 
        xl:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]
        ${className}`}
    >
      <li
        className="h-8 col-span-full rounded-3xl
          lg:col-span-1 
          lg:h-60"
      >
        <BookCreateLink className="size-full rounded-[inherit]" />
      </li>
      {items.map((item) => (
        <li key={item.id} className="relative h-24 rounded-3xl md:h-64">
          <BookOwnCard data={item} className="size-full rounded-[inherit]" />
          {isSelectionEnabled && (
            <label
              className="absolute top-1 left-1 size-6 rounded-full border-1 border-pr-main bg-pr-bg-main z-10 transition-all
              before:block before:size-full before:clip-check before:bg-pr-main hover:before:block not-has-checked:before:hidden hover:not-has-checked:before:opacity-50"
            >
              <input
                type="checkbox"
                name="select"
                value={item.id}
                className="screen-reader-only cursor-pointer"
                checked={isItemSelected(item.id)}
                onChange={() => onItemSelect(item.id)}
              />
            </label>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookOwnList;
