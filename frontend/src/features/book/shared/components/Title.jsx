import Skeleton from '@shared/components/ui/Skeleton';

const BookTitle = ({ title, isLoading, as: Tag = 'span', className = '' }) => {
  return <Tag className={className}>{isLoading ? <Skeleton type="text" /> : title}</Tag>;
};

export default BookTitle;
