import { PencilIcon } from '@heroicons/react/24/outline';
import EditUserInfoForm from '@settings/components/UserInfoForm';
import ROUTES from '@app/router/constants/routes';
import { useSession } from '@app/providers/SessionProvider';
import UserImage from '@user/shared/components/Image';
import NavigationLink from '@shared/components/navigation/Link';

const UserInfoSettingsPage = () => {
  const { user, isPending } = useSession();

  return (
    <section className="h-full flex flex-col gap-8 justify-center items-center">
      <div className="relative size-fit">
        <UserImage className="size-44" imageUrl={user?.imageUrl} isLoading={isPending} />
        <NavigationLink
          to={ROUTES.SETTINGS.PHOTO}
          className="absolute right-4 bottom-0 size-9 p-2 rounded-full bg-pr-bg-secondary z-10"
        >
          <PencilIcon />
        </NavigationLink>
      </div>

      <EditUserInfoForm userCurrentData={user} isPending={isPending} />
    </section>
  );
};

export default UserInfoSettingsPage;
