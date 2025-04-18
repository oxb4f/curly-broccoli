import { UserCircleIcon } from '@heroicons/react/24/solid';
import Skeleton from '../../Skeleton/Skeleton';

const ProfilePhoto = ({ imageUrl, isLoading, className = '' }) => {
  return (
    <figure
      className={`flex justify-center items-center rounded-full overflow-hidden ${className}`}
    >
      {isLoading ? (
        <Skeleton height="100%" />
      ) : imageUrl ? (
        <img src={imageUrl} alt="Profile image" className="max-w-full max-h-full" />
      ) : (
        <UserCircleIcon className="size-full text-pr-text scale-125" />
      )}
    </figure>
  );
};

export default ProfilePhoto;
