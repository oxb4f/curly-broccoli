import './PersonalInfo.css';

const ProfilePersonalInfo = ({ personalInfo = {}, className = '' }) => {
  const personalInfoValues = Object.values(personalInfo);
  return (
    <>
      {Boolean(personalInfoValues.length) && (
        <div className={`profile-personal-info description ${className}`}>
          {personalInfoValues.join(', ')}
        </div>
      )}
    </>
  );
};

export default ProfilePersonalInfo;
