import Skeleton from '@shared/components/ui/Skeleton';

const UserPersonalInfo = ({ personalInfo, isLoading, short, className = '' }) => {
  const personalInfoValues = Object.values(personalInfo ?? {});
  return (
    <p className={`break-words description ${short ? 'max-w-32 truncate' : ''} ${className}`}>
      {isLoading ? (
        <Skeleton type={'text'} />
      ) : (
        Boolean(personalInfoValues.length) && personalInfoValues.join(', ')
      )}
    </p>
  );
};

export default UserPersonalInfo;
