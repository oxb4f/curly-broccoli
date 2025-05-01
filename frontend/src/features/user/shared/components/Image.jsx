import { UserCircleIcon } from '@heroicons/react/24/solid';
import Skeleton from '@shared/components/ui/Skeleton';

const UserImage = ({ imageUrl, isLoading, className = '' }) => {
  return (
    <figure
      className={`flex justify-center items-center rounded-full overflow-hidden aspect-square ${className}`}
    >
      {isLoading ? (
        <Skeleton height="100%" />
      ) : imageUrl ? (
        <img src={imageUrl} alt="Profile image" className="size-full text-center" />
      ) : (
        <UserCircleIcon className="size-full text-pr-text scale-125" />
      )}
    </figure>
  );
};

export default UserImage;
