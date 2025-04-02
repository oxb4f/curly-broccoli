import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import AsyncProfilePhoto from '../../../asyncs/Profile/Photo';
import AsyncProfileUsername from '../../../asyncs/Profile/Username';
import AsyncProfilePersonalInfo from '../../../asyncs/Profile/PersonalInfo';
import AsyncSocial from '../../../asyncs/Social/Social';
import ProfileStats from '../../../stats/Profile/Profile';

const ProfileCard = ({ className = '' }) => {
  const { user, isPending } = useSession();
  // const isPending = true;
  // const user = null;

  if (!user && !isPending) return;

  return (
    <article className={`w-full ${className}`}>
      <header className="w-full flex flex-col items-center gap-y-4">
        <AsyncProfilePhoto className="size-44" imageUrl={user?.imageUrl} isPending={isPending} />
        <AsyncProfileUsername
          className="min-w-16 max-w-28 min-h-8 text-2xl"
          username={user?.username}
          isPending={isPending}
        />
      </header>

      <section className="flex flex-col items-center gap-1.5">
        <AsyncProfilePersonalInfo
          className="min-w-20 max-w-40 min-h-6 text-base"
          personalInfo={user?.personalInfo?.calculated}
          isPending={isPending}
        />

        <AsyncSocial
          className="min-w-7 max-w-16 min-h-7"
          social={user?.social}
          isPending={isPending}
        />
      </section>

      <section className="flex justify-center">
        <ProfileStats
          className="max-w-md grid grid-cols-[repeat(auto-fit,6rem)] gap-x-6 justify-center
          md:max-w-lg
          lg:max-w-xl"
        />
      </section>
    </article>
  );
};

export default ProfileCard;
