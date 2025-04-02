const ProfilePersonalInfo = ({ personalInfo = {}, className = '' }) => {
  const personalInfoValues = Object.values(personalInfo);
  return (
    <>
      {Boolean(personalInfoValues.length) && (
        <div className={`text-center break-words description ${className}`}>
          {personalInfoValues.join(', ')}
        </div>
      )}
    </>
  );
};

export default ProfilePersonalInfo;
