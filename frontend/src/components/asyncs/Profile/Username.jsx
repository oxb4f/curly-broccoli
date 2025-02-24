import ProfileUsername from '../../core/Profile/Username/Username';
import Skeleton from '../../core/Skeleton/Skeleton';

const AsyncProfileUsername = ({ isPending, className = '', ...props }) => {
  return (
    <>
      {isPending ? (
        <Skeleton className={className} type="text" />
      ) : (
        <ProfileUsername className={className} {...props} />
      )}
    </>
  );
};

export default AsyncProfileUsername;
