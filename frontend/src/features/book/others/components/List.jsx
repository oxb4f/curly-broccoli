import BookOthersCard from '@book/others/components/Card';

const BookOthersList = ({ isPrivate, items = [], className = '' }) => {
  return (
    <ul
      className={`w-full grid grid-cols-1 gap-4 
        md:grid-cols-2 
        lg:grid-cols-4 
        xl:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]
        ${className}`}
    >
      {items.map((item) => (
        <li key={item.id} className="relative h-24 md:h-60">
          <BookOthersCard data={item} className="size-full" isPrivate={isPrivate} />
        </li>
      ))}
    </ul>
  );
};

export default BookOthersList;
