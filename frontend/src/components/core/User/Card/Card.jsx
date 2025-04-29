import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import UserStats from '../Stats/Stats';
import UserUsername from '../Username/Username';
import UserImage from '../Image/Image';
import UserPersonalInfo from '../PersonalInfo/PersonalInfo';
import Social from '../../Social/Social';
import NavigationLink from '../../Navigation/Link/Link';
import ROUTES from '../../../../constants/routes';

const UserCard = ({ user, isLoading, className = '' }) => {
  if (isLoading) return;

  return (
    <article
      className={`relative grid grid-cols-[5rem_1fr] grid-rows-[1fr_1fr] px-4 py-3 gap-x-4 gap-y-2 rounded-lg 
        md:grid-rows-[9rem_2rem_auto] md:grid-cols-1
        hover:bg-pr-bg-secondary ${className}`}
    >
      <NavigationLink to={`${ROUTES.MAIN.USERS}/${user?.id}`} className="absolute inset-0 z-10" />
      <UserImage
        className="justify-self-center row-span-full
        md:row-span-1"
        imageUrl={user?.imageUrl}
        isLoading={isLoading}
      />
      <UserUsername
        className="self-end max-w-full text-2xl truncate text-start 
        md:text-xl md:text-center"
        username={user?.username}
        isLoading={isLoading}
      />
      <UserPersonalInfo
        personalInfo={[user?.personalInfo?.calculated?.fullName]}
        isLoading={isLoading}
        className="col-start-2 col-end-full truncate text-lg text-start
        md:col-start-1 md:text-center md:text-sm"
      />

      {/* <section className="flex justify-center">
        <UserStats
          className="max-w-md grid grid-cols-[repeat(auto-fit,6rem)] gap-x-6 justify-center
          md:max-w-lg
          lg:max-w-xl"
        />
      </section> */}
    </article>
  );
};

export default UserCard;
