import UserOverview from '@user/shared/components/Overview';
import { useUser } from '@app/providers/UserProvider';
import BookInfiniteQueryWrapper from '@book/shared/components/InfiniteQueryWrapper';
import BookOthersCatalog from '@book/others/components/Catalog';

const OthersProfilePage = () => {
  const { user, isPending } = useUser();

  return (
    <section className="size-full py-5 grid gap-3 grid-rows-[min-content_1fr]">
      <header className="flex flex-col items-center gap-4">
        <UserOverview user={user} isLoading={isPending} />
      </header>
      <section>
        <BookInfiniteQueryWrapper userId={user?.id}>
          {(books) => <BookOthersCatalog items={books} isPrivate />}
        </BookInfiniteQueryWrapper>
      </section>
    </section>
  );
};

export default OthersProfilePage;
