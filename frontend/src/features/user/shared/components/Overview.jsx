import UserStats from './Stats';
import UserUsername from './Username';
import UserImage from './Image';
import UserPersonalInfo from './PersonalInfo';
import Social from '@shared/components/ui/Social';
import FollowButton from '@following/components/FollowButton';

const UserOverview = ({ user, isLoading, isOwn, className = '' }) => {
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
        as="h2"
      />

      <UserPersonalInfo
        className="min-w-20 max-h-24 overflow-y-auto text-base text-center md:text-start"
        personalInfo={user?.personalInfo?.calculated}
        isLoading={isLoading}
      />

      <div className="w-full col-start-2 row-start-4 flex max-md:grid-rows-[1fr_auto] md:grid-cols-[1fr_auto] gap-4">
        {!isOwn && <FollowButton targetUser={user} isLoading={isLoading} className="grow" />}

        <Social
          className="self-center max-w-1/3 grow-0 justify-self-center md:justify-self-start min-w-7"
          social={user?.social}
          isLoading={isLoading}
        />
      </div>

      <UserStats
        data={user?.stats}
        className="max-w-md grid grid-cols-[repeat(auto-fit,6rem)] gap-x-3
          md:max-w-lg
          lg:max-w-xl"
        isLoading={isLoading}
      />
    </section>
  );
};

export default UserOverview;
