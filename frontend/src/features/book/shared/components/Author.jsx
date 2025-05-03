import Skeleton from '@shared/components/ui/Skeleton';

const BookAuthor = ({ author, isLoading, as: Tag = 'span', className = '' }) => {
  return <Tag className={className}>{isLoading ? <Skeleton type="text" /> : author}</Tag>;
};

export default BookAuthor;
