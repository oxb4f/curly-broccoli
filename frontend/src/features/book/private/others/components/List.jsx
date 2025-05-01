import BookPrivateCard from '@book/private/shared/components/Card';

const BookPrivateList = ({ items = [], className = '' }) => {
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
          <BookPrivateCard isOwn={false} data={item} />
        </li>
      ))}
    </ul>
  );
};

export default BookPrivateList;
