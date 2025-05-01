import StaticStats from '@shared/components/ui/stats/static/Static';

const UserStats = ({ data, className = '' }) => {
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

export default UserStats;
