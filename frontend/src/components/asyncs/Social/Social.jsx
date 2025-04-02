import Social from '../../core/Social/Social';
import Skeleton from '../../core/Skeleton/Skeleton';

const AsyncSocial = ({ isPending, className = '', ...props }) => {
  return (
    <>
      {isPending ? (
        <Skeleton className={className} type="text" />
      ) : (
        <Social className={className} {...props} />
      )}
    </>
  );
};

export default AsyncSocial;
