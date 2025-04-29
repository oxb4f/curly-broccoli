import UserOverview from '../../../../components/core/User/Overview/Overview';
import { useSession } from '../../../../components/core/SessionProvider/SessionProvider';
import BookInfiniteQueryWrapper from '../../../../components/core/Book/InfiniteQueryWrapper/InfiniteQueryWrapper';
import BookPrivateOwnCatalog from '../../../../components/core/Book/Private/Own/Catalog/Catalog';

const OwnProfilePage = () => {
  const { user, isPending } = useSession();

  return (
    <section className="size-full py-5 grid gap-3 grid-rows-[min-content_1fr]">
      <header className="flex flex-col items-center gap-4">
        <UserOverview user={user} isLoading={isPending} className="flex flex-col gap-2" />
      </header>
      <section>
        <BookInfiniteQueryWrapper userId={user?.id}>
          {(books) => <BookPrivateOwnCatalog items={books} />}
        </BookInfiniteQueryWrapper>
      </section>
    </section>
  );
};

export default OwnProfilePage;
