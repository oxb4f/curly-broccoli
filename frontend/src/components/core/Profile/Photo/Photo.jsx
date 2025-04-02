import { UserCircleIcon } from '@heroicons/react/24/solid';

const ProfilePhoto = ({ imageUrl, className = '' }) => {
  return (
    <figure className={`rounded-full overflow-hidden flex items-center ${className}`}>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile image" className="w-full text-center" />
      ) : (
        <UserCircleIcon className="size-full text-pr-text scale-125" />
      )}
    </figure>
  );
};

export default ProfilePhoto;
