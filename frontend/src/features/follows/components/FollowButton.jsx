import useFollowService from '@features/follows/hooks/useFollowService';
import Skeleton from '@shared/components/ui/Skeleton';
import { useCallback, useRef, useState } from 'react';

const FollowButton = ({ targetUser, isLoading, className = '' }) => {
  const { follow, unfollow, isFollowPending, isUnfollowPending } = useFollowService(targetUser);
  const [isAnimated, setIsAnimated] = useState(false);
  const timeoutRef = useRef(null);

  const isPending = isFollowPending || isUnfollowPending;
  const isFollowed = targetUser?.followed;

  const showFollowedInitialState = isFollowed && (!isAnimated || isPending);
  const showUnfollowedInitialState = !isFollowed && (!isAnimated || isPending);
  const isAnimatingAfterFollow = isFollowed && isAnimated && !isPending;
  const isAnimatingAfterUnfollow = !isFollowed && isAnimated && !isPending;

  const triggerAnimation = useCallback(() => {
    setIsAnimated(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsAnimated(false), 2800);
  }, []);

  const handleClick = useCallback(async () => {
    if (isPending) return;

    triggerAnimation();

    if (isFollowed) {
      await unfollow();
    } else {
      await follow();
    }
  }, [isPending, isFollowed, unfollow, follow, triggerAnimation]);

  return isLoading ? (
    <Skeleton height="2rem" width="100%" type="button" />
  ) : (
    <button
      className={`relative size-full flex justify-center items-center px-3 py-1 rounded-2xl border-1 border-pr-main transition-all overflow-hidden
				hover:border-pr-main-soft active:border-pr-main
				disabled:cursor-default disabled:opacity-100 disabled:hover:border-pr-main 
        ${
          isAnimatingAfterUnfollow
            ? 'animate-swap-colors-reverse'
            : isAnimatingAfterFollow
            ? 'animate-swap-colors'
            : isFollowed
            ? 'bg-pr-bg-main text-pr-main transition-colors hover:text-pr-main-soft active:text-pr-main'
            : !isFollowed
            ? 'bg-pr-main text-pr-bg-main transition-colors hover:bg-pr-main-soft active:bg-pr-main'
            : ''
        }
        ${isAnimated ? 'animation-running' : 'animation-paused'}
				${className}`}
      onClick={handleClick}
      disabled={isPending || isAnimated}
    >
      <span
        className={`
            ${
              showFollowedInitialState || isAnimatingAfterUnfollow
                ? 'after:animate-print-unfollow after:border-pr-text'
                : showUnfollowedInitialState || isAnimatingAfterFollow
                ? 'after:animate-print-follow after:border-pr-text-inverted'
                : ''
            }
            ${isAnimated ? 'after:animation-running after:border-l-1' : 'after:animation-paused'}
					`}
      ></span>
    </button>
  );
};

export default FollowButton;

// ${
//   showFollowedInitialState
//     ? 'bg-pr-bg-main text-pr-main transition-colors group-hover:text-pr-main-soft group-active:text-pr-main'
//     : showUnfollowedInitialState
//     ? 'bg-pr-main text-pr-bg-main transition-colors group-hover:bg-pr-main-soft group-active:bg-pr-main'
//     : ''
// }
//   ${
//     isAnimatingAfterFollow
//       ? 'animate-swap-colors'
//       : isAnimatingAfterUnfollow
//       ? 'animate-swap-colors-reverse'
//       : ''
//   }

// ${
//   showFollowedInitialState
//     ? 'after:animate-static-unfollow-text'
//     : showUnfollowedInitialState
//     ? 'after:animate-static-follow-text'
//     : ''
// }
//   ${
//     isAnimatingAfterFollow
//       ? 'after:animate-print-follow after:border-l-1 after:border-pr-text-inverted'
//       : isAnimatingAfterUnfollow
//       ? 'after:animate-print-unfollow after:border-l-1 after:border-pr-text'
//       : ''
//   }
