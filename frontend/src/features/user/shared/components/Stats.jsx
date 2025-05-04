import ROUTES from '@app/router/constants/routes';
import Navigation from '@shared/components/navigation/Navigation';
import StaticStatsItem from '@shared/components/ui/stats/static/Item';

const UserStats = ({ data, isLoading, className = '' }) => {
  const stats = {
    items: [
      {
        name: 'books read',
        linkProps: {
          to: ROUTES.MAIN.PROFILE,
          children: (
            <StaticStatsItem isLoading={isLoading} count={1} className="size-full">
              books read
            </StaticStatsItem>
          )
        }
      },
      {
        name: 'followers',
        linkProps: {
          to: ROUTES.MAIN.PROFILE,
          children: (
            <StaticStatsItem isLoading={isLoading} count={data?.followersCount}>
              followers
            </StaticStatsItem>
          )
        }
      },
      {
        name: 'following',
        linkProps: {
          to: ROUTES.MAIN.PROFILE,
          children: (
            <StaticStatsItem isLoading={isLoading} count={data?.followingCount}>
              following
            </StaticStatsItem>
          )
        }
      }
    ],
    props: {
      className: 'flex justify-evenly'
    },
    linksClasses: 'block p-2',
    itemsClasses: 'size-full rounded-xl hover:bg-pr-bg-secondary active:bg-pr-bg-tertiary'
  };

  return <Navigation list={stats} />;
};

export default UserStats;
