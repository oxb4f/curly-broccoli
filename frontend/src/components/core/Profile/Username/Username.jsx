import Skeleton from '../../Skeleton/Skeleton';

const ProfileUsername = ({ username, className = '' }) => {
  return (
    <p className={`text-center break-words ${className}`}>{username ?? <Skeleton type="text" />}</p>
  );
};

export default ProfileUsername;
