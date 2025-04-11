import Stats from '../../core/Stats/Stats';
import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import useBookService from '../../../hooks/useBookService';
import Skeleton from '../../core/Skeleton/Skeleton';

const BookStats = ({ bookId, stats, isPublic, className = '' }) => {
  const { edit } = useBookService();

  const itemClasses = 'size-7 transition-all ';
  const iconClasses = 'text-pr-text hover:text-pr-text-darker hover:cursor-pointer hover:scale-105';
  const activeIconClasses = 'text-pr-main fill-pr-main';

  const items = {
    private: [
      {
        name: 'favorite',
        renderIcon: (isActive) => (
          <BookmarkIcon className={`${isActive ? activeIconClasses : iconClasses}`} />
        ),
        className: itemClasses,
        initialIsActive: stats?.isFavorite,
        onClick: async ({ isActive: isFavorite }) => {
          await edit(bookId, { isFavorite });
        }
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
    <Stats
      key={bookId}
      className={className}
      items={[...items.common, ...(isPublic ? items.public : items.private)]}
      isStatic={false}
    />
  ) : (
    <Skeleton type="text" />
  );
};

export default BookStats;
