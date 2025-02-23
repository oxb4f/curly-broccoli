import './Username.css';

const ProfileUsername = ({ username, className = '' }) => {
  return <div className={`profile-username ${className}`}>{username}</div>;
};

export default ProfileUsername;
