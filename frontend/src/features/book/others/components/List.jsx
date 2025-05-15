import BookOthersCard from '@book/others/components/Card';

const BookOthersList = ({ isPrivate, items = [], className = '' }) => {
  return (
    <ul
      className={`w-full grid grid-cols-1 gap-4 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]
        ${className}`}
    >
      {items.map((item) => (
        <li key={item.id} className="h-24 rounded-3xl sm:h-60">
          <BookOthersCard data={item} className="size-full" isPrivate={isPrivate} />
        </li>
      ))}
    </ul>
  );
};

export default BookOthersList;
