import { PencilIcon } from '@heroicons/react/24/outline';
import EditUserInfoForm from '@settings/components/UserInfoForm';
import ROUTES from '@app/router/constants/routes';
import { useSession } from '@app/providers/SessionProvider';
import UserImage from '@user/shared/components/Image';
import NavigationLink from '@shared/components/navigation/Link';

const UserInfoSettingsPage = () => {
  const { user, isPending } = useSession();

  return (
    <main className="main content-rows-[.6fr_1fr] gap-y-6">
      <div className="justify-self-center self-end relative flex">
        <UserImage className="size-44" imageUrl={user?.imageUrl} isLoading={isPending} />
        <NavigationLink
          to={ROUTES.SETTINGS.PHOTO}
          className="absolute right-4 bottom-0 size-9 p-2 rounded-full bg-pr-bg-secondary z-10"
        >
          <PencilIcon />
        </NavigationLink>
      </div>

      <EditUserInfoForm
        userCurrentData={user}
        isPending={isPending}
        className="justify-self-center self-start max-w-2xl"
      />
    </main>
  );
};

export default UserInfoSettingsPage;
