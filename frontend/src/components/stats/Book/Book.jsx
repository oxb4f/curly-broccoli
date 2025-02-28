import './Book.css';
import Stats from '../../core/Stats/Stats';
import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/outline';

const BookStats = ({ data, isPublic, className = '' }) => {
  isPublic = false;
  const isFavorite = true;
  const stats = {
    private: [
      {
        name: 'favorite',
        icon: BookmarkIcon,
        isActive: isFavorite
      }
    ],
    public: [],
    common: [
      {
        name: 'likes',
        icon: HeartIcon
      }
    ]
  };

  return (
    <Stats
      className={`book-stats ${className}`}
      list={[...stats.common, ...(isPublic ? stats.public : stats.private)]}
    />
  );
};

export default BookStats;
