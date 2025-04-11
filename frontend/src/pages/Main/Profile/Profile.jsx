import ProfileCard from '../../../components/core/Profile/Card/Card';
import BookCatalog from '../../../components/core/Book/Catalog/Catalog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useBookService from '../../../hooks/useBookService';
import { useEffect } from 'react';

const ProfilePage = () => {
  const queryClient = useQueryClient();

  const { getAll } = useBookService();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['books'],
    queryFn: () => getAll(false)
  });
  console.dir(data);

  return (
    <section className="size-full py-5 grid gap-3 grid-rows-[min-content_1fr]">
      <header>
        <ProfileCard className="flex flex-col gap-2" />
      </header>
      <section>
        <BookCatalog items={data?.books} isPublic={false} />
      </section>
    </section>
  );
};

export default ProfilePage;
