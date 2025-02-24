import './Profile.css';
import Stats from '../../core/Stats/Stats';

const ProfileStats = ({ data, className = '' }) => {
  const stats = [
    {
      count: 1,
      name: 'books read'
    },
    {
      count: 0,
      name: 'followers'
    },
    {
      count: 0,
      name: 'following'
    }
  ];

  return <Stats list={stats} className={`profile-stats ${className}`} />;
};

export default ProfileStats;
