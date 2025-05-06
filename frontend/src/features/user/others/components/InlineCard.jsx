import UserUsername from '@user/shared/components/Username';
import UserImage from '@user/shared/components/Image';
import NavigationLink from '@shared/components/navigation/Link';
import ROUTES from '@app/router/constants/routes';

const UserInlineCard = ({ user, isLoading, additionalSlot, className = '' }) => {
  if (isLoading) return;

  return (
    <article
      className={`relative grid grid-cols-[min-content_1fr] px-2 py-1 gap-x-3 rounded-lg
				${additionalSlot ? 'grid-rows-[min-content_1fr]' : 'grid-rows-1'}
         ${className}`}
      title={`Go to ${user?.username} profile page`}
    >
      <NavigationLink to={`${ROUTES.MAIN.USERS}/${user?.id}`} className="absolute inset-0 z-10" />
      <UserImage
        className="justify-self-center self-center h-full row-span-2"
        imageUrl={user?.imageUrl}
        isLoading={isLoading}
      />
      <UserUsername
        className="self-center truncate"
        username={user?.username}
        isLoading={isLoading}
      />
      {additionalSlot}
    </article>
  );
};

export default UserInlineCard;
