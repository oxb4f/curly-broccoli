import './Photo.css';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const ProfilePhoto = ({ imageUrl, className = '' }) => {
  return (
    <figure className={`profile-photo ${className}`}>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile image" className="profile-photo__image" />
      ) : (
        <UserCircleIcon className="profile-photo__image-icon" />
      )}
    </figure>
  );
};

export default ProfilePhoto;
