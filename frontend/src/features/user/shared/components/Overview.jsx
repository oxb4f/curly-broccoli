import UserStats from './Stats';
import UserUsername from './Username';
import UserImage from './Image';
import UserPersonalInfo from './PersonalInfo';
import Social from '@shared/components/ui/Social';
import FollowButton from '@features/follows/components/FollowButton';

const UserOverview = ({ user, isLoading, isOwn, as: Tag = 'article', className = '' }) => {
  if (!user && !isLoading) return;

  return (
    <Tag
      className={`flex flex-col items-center w-full max-w-xs grid-cols-[1fr_2fr] grid-rows-[repeat(4,auto)] gap-x-8 gap-y-3
				md:max-w-lg md:grid ${className}`}
    >
      <UserImage
        className="min-w-44 max-w-52 row-span-full col-start-1 justify-self-center"
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

      <div className="w-full col-start-2 row-start-4 flex flex-col md:flex-row gap-4">
        {!isOwn && <FollowButton targetUser={user} isLoading={isLoading} className="grow" />}

        <Social
          className="self-center max-w-1/3 grow-0 justify-self-center md:justify-self-start min-w-7"
          social={user?.social}
          isLoading={isLoading}
        />
      </div>

      <UserStats stats={user?.stats} userId={user?.id} className="w-full" isLoading={isLoading} />
    </Tag>
  );
};

export default UserOverview;
