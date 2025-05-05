import ROUTES from '@app/router/constants/routes';
import Navigation from '@shared/components/navigation/Navigation';
import StaticStatsItem from '@shared/components/ui/stats/static/Item';

const UserStats = ({ stats, userId, isLoading, className = '' }) => {
  const navigationItems = {
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
          to: `${ROUTES.MAIN.FOLLOWERS}/${userId}`,
          children: (
            <StaticStatsItem isLoading={isLoading} count={stats?.followersCount}>
              followers
            </StaticStatsItem>
          )
        }
      },
      {
        name: 'following',
        linkProps: {
          to: `${ROUTES.MAIN.FOLLOWINGS}/${userId}`,
          children: (
            <StaticStatsItem isLoading={isLoading} count={stats?.followingCount}>
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
    itemsClasses: 'rounded-xl hover:bg-pr-bg-secondary active:bg-pr-bg-tertiary'
  };

  return <Navigation list={navigationItems} className={className} />;
};

export default UserStats;
