import BookOthersCard from '@book/others/components/Card';
import BookOthersInlineCard from './InlineCard';

const BookOthersList = ({
  isPrivate,
  variant = 'default',
  items = [],
  className = '',
  itemsClassName = ''
}) => {
  return (
    <ul
      className={`w-full grid grid-cols-1 gap-4 ${
        variant === 'default'
          ? `sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]`
          : ''
      }
        ${className}`}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className={`rounded-3xl w-full ${
            variant === 'default' ? 'h-24 sm:h-60' : variant === 'inline' ? 'h-16' : ''
          } ${itemsClassName}`}
        >
          {variant === 'default' ? (
            <BookOthersCard data={item} className="size-full" isPrivate={isPrivate} />
          ) : variant === 'inline' ? (
            <BookOthersInlineCard data={item} className="size-full" isPrivate={isPrivate} />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default BookOthersList;
