import Skeleton from '@shared/components/ui/Skeleton';

const UserUsername = ({ username, isLoading, short, className = '', as: Tag = 'span' }) => {
  return (
    <Tag className={`break-words ${short ? 'max-w-24 truncate' : ''} ${className}`}>
      {isLoading ? <Skeleton type="text" /> : username}
    </Tag>
  );
};

export default UserUsername;
