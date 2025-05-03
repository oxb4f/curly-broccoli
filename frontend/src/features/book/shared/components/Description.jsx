import Skeleton from '@shared/components/ui/Skeleton';

const BookDescription = ({ description, isLoading, as: Tag = 'span', className = '' }) => {
  return <Tag className={className}>{isLoading ? <Skeleton type="text" /> : description}</Tag>;
};

export default BookDescription;
