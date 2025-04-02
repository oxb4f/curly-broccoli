const ProfileUsername = ({ username, className = '' }) => {
  return <div className={`text-center break-words ${className}`}>{username}</div>;
};

export default ProfileUsername;
