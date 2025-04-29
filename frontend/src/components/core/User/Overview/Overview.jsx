import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import ProfileStats from '../Stats/Stats';
import UserUsername from '../Username/Username';
import UserImage from '../Image/Image';
import UserPersonalInfo from '../PersonalInfo/PersonalInfo';
import Social from '../../Social/Social';
import useFollowersService from '../../../../hooks/useFollowersServive';
import { getUserFollowers } from '../../../../services/api/followers';

const UserOverview = ({ user, isLoading, className = '' }) => {
  const { follow, unfollow } = useFollowersService(user);
  const { user: sessionUser } = useSession();

  const isOwn = user?.id === sessionUser?.id;
  // console.log(getUserFollowers(sessionUser?.id));

  if (!user && !isLoading) return;

  return (
    <section
      className={`flex flex-col items-center max-w-2xs grid-cols-[1fr_20rem] grid-rows-[repeat(4,auto)] gap-x-8 gap-y-3
				md:max-w-2xl md:grid ${className}`}
    >
      <UserImage
        className="size-44 row-span-full col-start-1 justify-self-center"
        imageUrl={user?.imageUrl}
        isLoading={isLoading}
      />

      <UserUsername
        className="min-w-16 max-h-24 overflow-y-auto text-2xl"
        username={user?.username}
        isLoading={isLoading}
      />

      <UserPersonalInfo
        className="min-w-20 max-h-24 overflow-y-auto text-base text-center md:text-start"
        personalInfo={user?.personalInfo?.calculated}
        isLoading={isLoading}
      />

      <div className="w-full col-start-2 row-start-4 grid max-md:grid-rows-[1fr_auto] md:grid-cols-[1fr_auto] gap-4">
        {!isOwn && !isLoading && (
          <button
            className={`w-full p-2 rounded-2xl border-1 border-pr-main hover:border-pr-main-soft active:border-pr-main-mute md:py-1 transition-all ${
              user.followed
                ? 'text-pr-main hover:text-pr-main-soft active:text-pr-main-mute'
                : 'text-pr-bg-main bg-pr-main hover:bg-pr-main-soft active:bg-pr-main-mute'
            }`}
            onClick={async () => (user.followed ? await unfollow() : await follow())}
          >
            {user.followed ? 'Unfollow' : 'Follow'}
          </button>
        )}

        <Social
          className="self-center justify-self-center md:justify-self-start min-w-7 max-w-full"
          social={user?.social}
          isLoading={isLoading}
        />
      </div>

      <ProfileStats
        className="max-w-md grid grid-cols-[repeat(auto-fit,6rem)] gap-x-3
          md:max-w-lg
          lg:max-w-xl"
      />
    </section>
  );
};

export default UserOverview;
