import './Profile.css';
import ProfileSettingsForm from '../../../components/forms/Settings/Profile';
import Navigation from '../../../components/core/Navigation/Navigation';
import { PencilIcon } from '@heroicons/react/24/outline';
import ROUTES from '../../../constants/routes';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import AsyncProfilePhoto from '@/components/asyncs/Profile/Photo';

const SettingsProfilePage = () => {
  const { user, isPending } = useSession();

  const editPhotoNavigation = {
    icon: <PencilIcon />,
    to: ROUTES.SETTINGS.PHOTO
  };

  return (
    <section className="profile-settings">
      <div className="profile-settings__photo-container">
        <AsyncProfilePhoto
          className="profile-settings__photo"
          imageUrl={user?.imageUrl}
          isPending={isPending}
        />
        <Navigation
          item={editPhotoNavigation}
          className="profile-settings__edit-photo-navigation"
        />
      </div>

      <ProfileSettingsForm userCurrentData={user} isPending={isPending} />
    </section>
  );
};

export default SettingsProfilePage;
