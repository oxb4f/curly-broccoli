import UserOverview from '@user/shared/components/Overview';
import { useUser } from '@app/providers/UserProvider';
import BookInfiniteQueryWrapper from '@book/shared/components/InfiniteQueryWrapper';
import BookOthersCatalog from '@book/others/components/Catalog';

const OthersProfilePage = () => {
  const { user, isPending } = useUser();

  return (
    <main className="main content-rows-[auto_1fr]">
      <header className="flex flex-col items-center gap-4">
        <UserOverview user={user} isLoading={isPending} />
      </header>

      <BookInfiniteQueryWrapper userId={user?.id} isUserLoading={isPending}>
        {(books) => <BookOthersCatalog items={books} isPrivate className="py-4" />}
      </BookInfiniteQueryWrapper>
    </main>
  );
};

export default OthersProfilePage;
