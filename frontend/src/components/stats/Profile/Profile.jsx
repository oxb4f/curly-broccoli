import StaticStats from '../../core/Stats/Static/Static';

const ProfileStats = ({ data, className = '' }) => {
  const stats = [
    {
      name: 'books read',
      count: 1,
      children: 'books read'
    },
    {
      name: 'followers',
      count: 0,
      children: 'followers'
    },
    {
      name: 'following',
      count: 0,
      children: 'following'
    }
  ];

  return <StaticStats items={stats} className={className} />;
};

export default ProfileStats;
