import Skeleton from '../../Skeleton/Skeleton';

const UserPersonalInfo = ({ personalInfo, isLoading, className = '' }) => {
  const personalInfoValues = Object.values(personalInfo ?? {});
  return (
    <p className={`break-words description ${className}`}>
      {isLoading ? (
        <Skeleton type={'text'} />
      ) : (
        Boolean(personalInfoValues.length) && personalInfoValues.join(', ')
      )}
    </p>
  );
};

export default UserPersonalInfo;
