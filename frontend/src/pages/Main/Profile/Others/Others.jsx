import UserOverview from '../../../../components/core/User/Overview/Overview';
import { useUser } from '../../../../components/core/User/Provider/Provider';
import BookInfiniteQueryWrapper from '../../../../components/core/Book/InfiniteQueryWrapper/InfiniteQueryWrapper';
import BookPrivateCatalog from '../../../../components/core/Book/Private/Catalog/Catalog';

const OthersProfilePage = () => {
  const { user, isPending } = useUser();

  return (
    <section className="size-full py-5 grid gap-3 grid-rows-[min-content_1fr]">
      <header className="flex flex-col items-center gap-4">
        <UserOverview user={user} isLoading={isPending} />
      </header>
      <section>
        <BookInfiniteQueryWrapper userId={user?.id}>
          {(books) => <BookPrivateCatalog items={books} />}
        </BookInfiniteQueryWrapper>
      </section>
    </section>
  );
};

export default OthersProfilePage;
