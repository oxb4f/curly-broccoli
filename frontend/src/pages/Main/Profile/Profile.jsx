import './Profile.css';
import ProfileCard from '../../../components/core/Profile/Card/Card';
import BookCard from '../../../components/core/Book/Card/Card';

const ProfilePage = () => {
  return (
    <section className="profile">
      <header className="profile__header">
        <ProfileCard className="profile__card" />
      </header>
      <section className="profile__content">
        <BookCard />
      </section>
    </section>
  );
};

export default ProfilePage;
