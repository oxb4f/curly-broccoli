import UserUsername from '@user/shared/components/Username';
import UserImage from '@user/shared/components/Image';
import UserPersonalInfo from '@user/shared/components/PersonalInfo';
import NavigationLink from '@shared/components/navigation/Link';
import ROUTES from '@app/router/constants/routes';

const UserCard = ({ user, isLoading, className = '' }) => {
  if (isLoading) return;

  return (
    <article
      className={`relative grid grid-rows-[1fr_1fr] grid-cols-[5rem_1fr] gap-x-4 gap-y-2 px-4 py-3 text-2xl 
        hover:bg-pr-bg-secondary 
        md:grid-rows-[9rem_2rem_auto] md:grid-cols-1 md:text-xl md:text-center 
             ${className}`}
    >
      <NavigationLink to={`${ROUTES.MAIN.USERS}/${user?.id}`} className="absolute inset-0 z-10" />
      <UserImage
        className="justify-self-center self-center row-span-full h-full
        md:row-span-1"
        imageUrl={user?.imageUrl}
        isLoading={isLoading}
      />
      <UserUsername
        className="self-end max-w-full"
        username={user?.username}
        isLoading={isLoading}
        as="h2"
        short
      />
      <UserPersonalInfo
        personalInfo={[user?.personalInfo?.calculated?.fullName]}
        isLoading={isLoading}
        className="col-start-2 col-end-full max-w-full text-lg
        md:col-start-1 md:text-sm"
        short
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
