import Skeleton from '../../Skeleton/Skeleton';

const ProfilePersonalInfo = ({ personalInfo, className = '' }) => {
  const personalInfoValues = Object.values(personalInfo ?? {});
  return (
    <p className={`text-center break-words description ${className}`}>
      {personalInfo ? (
        Boolean(personalInfoValues.length) && personalInfoValues.join(', ')
      ) : (
        <Skeleton type={'text'} />
      )}
    </p>
  );
};

export default ProfilePersonalInfo;
