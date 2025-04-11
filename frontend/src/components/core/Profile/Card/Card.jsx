import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import ProfileStats from '../../../stats/Profile/Profile';
import ProfileUsername from '../Username/Username';
import ProfilePhoto from '../Photo/Photo';
import ProfilePersonalInfo from '../PersonalInfo/PersonalInfo';
import Social from '../../Social/Social';

const ProfileCard = ({ className = '' }) => {
  const { user, isPending } = useSession();
  // const isPending = true;
  // const user = null;

  if (!user && !isPending) return;

  return (
    <article className={`w-full ${className}`}>
      <header className="w-full flex flex-col items-center gap-y-4">
        <ProfilePhoto className="size-44" imageUrl={user?.imageUrl} isLoading={isPending} />
        <ProfileUsername className="min-w-16 max-w-28 text-2xl" username={user?.username} />
      </header>

      <section className="flex flex-col items-center gap-1.5">
        <ProfilePersonalInfo
          className="min-w-20 max-w-40 text-base"
          personalInfo={user?.personalInfo?.calculated}
        />

        <Social className="min-w-7 max-w-20" social={user?.social} />
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
