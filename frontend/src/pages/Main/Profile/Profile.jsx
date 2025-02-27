import './Profile.css';
import ProfileCard from '../../../components/core/Profile/Card/Card';
import BookCard from '../../../components/core/Book/Card/Card';

const ProfilePage = () => {
  return (
    <section className="profile-page">
      <header className="profile-page__header">
        <ProfileCard className="profile-page__card" />
      </header>
      <section className="profile-page__content">
        <BookCard />
      </section>
    </section>
  );
};

export default ProfilePage;
