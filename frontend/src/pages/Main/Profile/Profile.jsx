import './Profile.css';
import ProfileCard from '../../../components/core/Profile/Card/Card';
import BookCard from '../../../components/core/Book/Card/Card';
import BookCatalog from '../../../components/core/Book/Catalog/Catalog';

const ProfilePage = () => {
  const bookList = [
    {
      id: 1
    }
  ];

  return (
    <section className="profile-page">
      <header className="profile-page__header">
        <ProfileCard className="profile-page__profile-card" />
      </header>
      <section className="profile-page__content">
        <BookCatalog list={bookList} isPublic={false} />
        {/* <BookCard /> */}
      </section>
    </section>
  );
};

export default ProfilePage;
