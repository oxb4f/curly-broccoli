import ProfileSettingsForm from '../../../components/forms/Settings/Profile';
import { PencilIcon } from '@heroicons/react/24/outline';
import ROUTES from '../../../constants/routes';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import UserImage from '../../../components/core/User/Image/Image';
import NavigationLink from '../../../components/core/Navigation/Link/Link';

const SettingsProfilePage = () => {
  const { user, isPending } = useSession();

  return (
    <section className="size-full flex flex-col gap-8 justify-center items-center">
      <div className="relative size-fit">
        <UserImage className="size-44" imageUrl={user?.imageUrl} isLoading={isPending} />
        <NavigationLink
          to={ROUTES.SETTINGS.PHOTO}
          className="absolute right-4 bottom-0 size-9 p-2 rounded-full bg-pr-bg-secondary z-10"
        >
          <PencilIcon />
        </NavigationLink>
      </div>

      <ProfileSettingsForm userCurrentData={user} isPending={isPending} />
    </section>
  );
};

export default SettingsProfilePage;
