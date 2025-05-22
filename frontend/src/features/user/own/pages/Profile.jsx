import UserOverview from '@user/shared/components/Overview';
import { useSession } from '@app/providers/SessionProvider';
import BookInfiniteQueryWrapper from '@book/shared/components/InfiniteQueryWrapper';
import BookOwnCatalog from '@book/own/components/Catalog';

const OwnProfilePage = () => {
  const { user, isPending } = useSession();

  return (
    <section className="size-full py-5 grid gap-3 grid-rows-[min-content_1fr]">
      <header className="flex flex-col items-center gap-4">
        <UserOverview user={user} isLoading={isPending} className="flex flex-col gap-2" isOwn />
      </header>
      <section>
        <BookInfiniteQueryWrapper userId={user?.id} isUserLoading={isPending}>
          {(books) => <BookOwnCatalog items={books} className="size-full" />}
        </BookInfiniteQueryWrapper>
      </section>
    </section>
  );
};

export default OwnProfilePage;
