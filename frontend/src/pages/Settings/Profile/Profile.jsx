import './Profile.css';
import ProfileSettingsForm from '../../../components/forms/Settings/Profile';
import { PencilIcon } from '@heroicons/react/24/outline';
import ROUTES from '../../../constants/routes';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import AsyncProfilePhoto from '@/components/asyncs/Profile/Photo';
import { Link } from 'react-router';

const SettingsProfilePage = () => {
  const { user, isPending } = useSession();

  return (
    <section className="profile-settings-page">
      <div className="profile-settings-page__photo-container">
        <AsyncProfilePhoto
          className="profile-settings-page__photo"
          imageUrl={user?.imageUrl}
          isPending={isPending}
        />
        <Link to={ROUTES.SETTINGS.PHOTO} className="profile-settings-page__link">
          <PencilIcon />
        </Link>
      </div>

      <ProfileSettingsForm userCurrentData={user} isPending={isPending} />
    </section>
  );
};

export default SettingsProfilePage;
