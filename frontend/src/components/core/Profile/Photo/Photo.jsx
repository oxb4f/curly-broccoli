import { UserCircleIcon } from '@heroicons/react/24/solid';
import Skeleton from '../../Skeleton/Skeleton';

const ProfilePhoto = ({ imageUrl, isLoading, className = '' }) => {
  return (
    <figure className={`rounded-full overflow-hidden flex items-center ${className}`}>
      {isLoading ? (
        <Skeleton height="100%" />
      ) : imageUrl ? (
        <img src={imageUrl} alt="Profile image" className="w-full text-center" />
      ) : (
        <UserCircleIcon className="size-full text-pr-text scale-125" />
      )}
    </figure>
  );
};

export default ProfilePhoto;
