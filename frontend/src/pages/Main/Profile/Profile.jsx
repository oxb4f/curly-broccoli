import ProfileCard from '../../../components/core/Profile/Card/Card';
import BookCard from '../../../components/core/Book/Card/Card';
import BookCatalog from '../../../components/core/Book/Catalog/Catalog';

const ProfilePage = () => {
  const bookList = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    }
  ];

  return (
    <section className="size-full py-5 grid gap-3">
      <header>
        <ProfileCard className="flex flex-col gap-2" />
      </header>
      <section>
        <BookCatalog list={bookList} isPublic={false} />
        {/* <BookCard /> */}
      </section>
    </section>
  );
};

export default ProfilePage;
