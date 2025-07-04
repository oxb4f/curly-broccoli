import { BookmarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import useBookService from '../hooks/useBookService';
import Skeleton from '@shared/components/ui/Skeleton';
import ChangeableStats from '@shared/components/ui/stats/changeable/Changeable';

const BookStats = ({ bookId, stats, isOwn, className = '' }) => {
  const { edit } = useBookService();

  const itemClasses = 'size-7 transition-all ';
  const iconClasses = 'text-pr-text hover:text-pr-text-darker hover:cursor-pointer hover:scale-105';
  const activeIconClasses = 'text-pr-main fill-pr-main';

  const items = {
    private: [
      {
        name: 'read',
        className: itemClasses,
        isActive: stats?.isRead,
        onClick: async ({ isActive: isRead }) => {
          await edit({ id: bookId, inputData: { isRead } });
        },
        children: (isActive) => (
          <CheckCircleIcon className={`${isActive ? 'text-pr-main' : iconClasses}`} />
        )
      },
      {
        name: 'favorite',
        className: itemClasses,
        isActive: stats?.isFavorite,
        onClick: async ({ isActive: isFavorite }) => {
          await edit({ id: bookId, inputData: { isFavorite } });
        },
        children: (isActive) => (
          <BookmarkIcon className={`${isActive ? activeIconClasses : iconClasses}`} />
        )
      }
    ],
    public: [],
    common: [
      // {
      //   name: 'likes',
      //   icon: HeartIcon,
      //   className: staticIconClasses
      // }
    ]
  };

  return stats ? (
    <ChangeableStats
      className={className}
      items={[...items.common, ...(isOwn ? items.private : items.public)]}
    />
  ) : (
    <Skeleton type="text" />
  );
};

export default BookStats;
