import Stats from '../../core/Stats/Stats';
import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/outline';

const BookStats = ({ data, isPublic, className = '' }) => {
  isPublic = false;
  // const isFavorite = true;
  const staticIconClasses = 'size-7 hover:text-pr-text-darker hover:cursor-pointer hover:scale-105';
  // const commonIconClasses = (isActive) =>
  //   `${
  //     isActive
  //       ? `${staticIconClasses} text-pr-main fill-pr-main hover:text-pr-main hover:cursor-pointer hover:transform-none`
  //       : staticIconClasses
  //   }`;
  const stats = {
    private: [
      {
        name: 'favorite',
        icon: BookmarkIcon,
        className: staticIconClasses
      }
    ],
    public: [],
    common: [
      {
        name: 'likes',
        icon: HeartIcon,
        className: staticIconClasses
      }
    ]
  };

  return (
    <Stats
      className={className}
      list={[...stats.common, ...(isPublic ? stats.public : stats.private)]}
    />
  );
};

export default BookStats;
