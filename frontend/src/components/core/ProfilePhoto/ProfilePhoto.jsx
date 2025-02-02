import './ProfilePhoto.css';
import profileImage from '@/assets/images/profile-photo.jpg';

const ProfilePhoto = ({ className }) => {
  return (
    <div className={`profile-photo-wrapper ${className ?? ''}`}>
      <div className="profile-photo">
        <img src={profileImage} alt="Profile image" className="profile-photo__image" />
      </div>
    </div>
  );
};

export default ProfilePhoto;
