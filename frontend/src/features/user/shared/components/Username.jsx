import Skeleton from '@shared/components/ui/Skeleton';

const UserUsername = ({ username, isLoading, className = '' }) => {
  return (
    <h2 className={`break-words ${className}`}>
      {isLoading ? <Skeleton type="text" /> : username}
    </h2>
  );
};

export default UserUsername;
