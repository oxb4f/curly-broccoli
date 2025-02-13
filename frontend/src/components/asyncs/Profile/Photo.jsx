import ProfilePhoto from '../../core/Profile/Photo/Photo';
import Skeleton from '../../core/Skeleton/Skeleton';

const AsyncProfilePhoto = ({ isPending, className = '', ...props }) => {
  return (
    <>
      {isPending ? (
        <Skeleton className={className} type="rounded" />
      ) : (
        <ProfilePhoto className={className} {...props} />
      )}
    </>
  );
};

export default AsyncProfilePhoto;
