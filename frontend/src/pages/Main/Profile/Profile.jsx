import ProfileCard from '../../../components/core/Profile/Card/Card';
import BookCatalog from '../../../components/core/Book/Catalog/Catalog';
import { getPrivateBooks } from '../../../services/api/book';
import InfiniteQuery from '../../../components/core/InfiniteQuery/InfiniteQuery';
import QUERY_KEYS from '../../../constants/queryKeys';

const ProfilePage = () => {
  const transformData = (data) => data.books;

  return (
    <section className="size-full py-5 grid gap-3 grid-rows-[min-content_1fr]">
      <header>
        <ProfileCard className="flex flex-col gap-2" />
      </header>
      <section>
        <InfiniteQuery
          callback={(offset) => getPrivateBooks({ offset })}
          keys={QUERY_KEYS.BOOKS.PRIVATE}
          dataTransformer={transformData}
        >
          {(items) => <BookCatalog items={items} isPublic={false} />}
        </InfiniteQuery>
      </section>
    </section>
  );
};

export default ProfilePage;
