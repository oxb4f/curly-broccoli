import { BookmarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import useBooksService from '../../../hooks/useBooksService';
import Skeleton from '../../core/Skeleton/Skeleton';
import ChangeableStats from '../../core/Stats/Changeable/Changeable';

const BookStats = ({ bookId, stats, isPublic, className = '' }) => {
  const { edit } = useBooksService();

  const itemClasses = 'size-7 transition-all ';
  const iconClasses = 'text-pr-text hover:text-pr-text-darker hover:cursor-pointer hover:scale-105';
  const activeIconClasses = 'text-pr-main fill-pr-main';

  const items = {
    private: [
      {
        name: 'read',
        className: itemClasses,
        initialIsActive: stats?.isRead,
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
        initialIsActive: stats?.isFavorite,
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
      items={[...items.common, ...(isPublic ? items.public : items.private)]}
    />
  ) : (
    <Skeleton type="text" />
  );
};

export default BookStats;
