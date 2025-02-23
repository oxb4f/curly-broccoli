import ProfilePersonalInfo from '../../core/Profile/PersonalInfo/PersonalInfo';
import Skeleton from '../../core/Skeleton/Skeleton';

const AsyncProfilePersonalInfo = ({ isPending, className = '', ...props }) => {
  return (
    <>
      {isPending ? (
        <Skeleton className={className} type="text" width="6rem" />
      ) : (
        <ProfilePersonalInfo className={className} {...props} />
      )}
    </>
  );
};

export default AsyncProfilePersonalInfo;
