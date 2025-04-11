import Stats from '../../core/Stats/Stats';

const ProfileStats = ({ data, className = '' }) => {
  const stats = [
    {
      name: 'books read',
      initialCount: 1
    },
    {
      name: 'followers',
      initialCount: 0
    },
    {
      name: 'following',
      initialCount: 0
    }
  ];

  return <Stats items={stats} className={className} />;
};

export default ProfileStats;
