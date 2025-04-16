import BookCard from '../Card/Card';
import BookCreateLink from '../Link/Create/Create';

const BookCatalog = ({ items = [], isPublic = true, className = '' }) => {
  return (
    <ul
      className={`w-full grid grid-cols-1 gap-4 
        md:grid-cols-2 md:${isPublic ? 'auto-rows-[20rem]' : 'auto-rows-auto'} 
        lg:grid-cols-4 
        xl:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]
        ${className}`}
    >
      {!isPublic && (
        <li
          className="group h-8 col-span-full 
          lg:col-span-1 
          lg:h-60"
        >
          <BookCreateLink className="size-full" />
        </li>
      )}
      {items.map((item) => (
        <li key={item.id} className="h-24 md:h-60">
          <BookCard isPublic={isPublic} data={item} />
        </li>
      ))}
    </ul>
  );
};

export default BookCatalog;
