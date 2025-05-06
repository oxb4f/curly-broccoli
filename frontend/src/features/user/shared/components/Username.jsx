import Skeleton from '@shared/components/ui/Skeleton';

const UserUsername = ({ username, isLoading, className = '', as: Tag = 'span' }) => {
  return (
    <Tag className={`break-words ${className}`}>
      {isLoading ? <Skeleton type="text" /> : username}
    </Tag>
  );
};

export default UserUsername;
