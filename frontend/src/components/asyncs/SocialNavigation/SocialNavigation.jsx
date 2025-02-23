import SocialNavigation from '../../navigations/Social/Social';
import Skeleton from '../../core/Skeleton/Skeleton';

const AsyncSocialNavigation = ({ isPending, className = '', ...props }) => {
  return (
    <>
      {isPending ? (
        <Skeleton className={className} type="text" />
      ) : (
        <SocialNavigation className={className} {...props} />
      )}
    </>
  );
};

export default AsyncSocialNavigation;
