import './Card.css';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import AsyncProfilePhoto from '../../../asyncs/Profile/Photo';
import AsyncProfileUsername from '../../../asyncs/Profile/Username';
import AsyncProfilePersonalInfo from '../../../asyncs/Profile/PersonalInfo';
import AsyncSocialNavigation from '../../../asyncs/SocialNavigation/SocialNavigation';
import ProfileStats from '../../../stats/Profile/Profile';

const ProfileCard = ({ className = '' }) => {
  const { user, isPending } = useSession();
  // const isPending = true;
  // const user = null;

  if (!user && !isPending) return;

  return (
    <article className={`profile-card ${className}`}>
      <header className="profile-card__header">
        <AsyncProfilePhoto
          className="profile-card__photo"
          imageUrl={user?.imageUrl}
          isPending={isPending}
        />
        <AsyncProfileUsername
          className="profile-card__username"
          username={user?.username}
          isPending={isPending}
        />
      </header>

      <section className="profile-card__details">
        <AsyncProfilePersonalInfo
          className="profile-card__personal-info"
          personalInfo={user?.personalInfo?.calculated}
          isPending={isPending}
        />

        <AsyncSocialNavigation
          className="profile-card__social-navigation"
          social={user?.social}
          isPending={isPending}
        />
      </section>

      <section className="profile-card__footer">
        <ProfileStats className="profile-card__stats" />
      </section>
    </article>
  );
};

export default ProfileCard;
