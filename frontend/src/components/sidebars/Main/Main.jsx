import DropDown from '../../core/DropDown/DropDown';
import Logo from '../../core/Logo/Logo';
import ProfilePhoto from '../../core/Profile/Photo/Photo';
import Sidebar from '../../core/Sidebar/Sidebar';
import Navigation from '../../core/Navigation/Navigation';
import NavigationLink from '../../core/Navigation/Link/Link';
import {
  HomeIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import ROUTES from '../../../constants/routes';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import { useMemo } from 'react';
import useUserService from '../../../hooks/useUsersService';

const MainSidebar = ({ className = '' }) => {
  const { user, isPending } = useSession();
  const { logOut } = useUserService();

  const staticLinkClasses = 'block size-9 rounded-full transition-all ease-out';
  const commonLinkClasses = ({ isActive }) =>
    isActive
      ? `${staticLinkClasses} text-pr-main`
      : `${staticLinkClasses} text-pr-text hover:scale-105 hover:text-pr-text-darker`;
  const profileLinkClasses = ({ isActive }) =>
    isActive
      ? `${staticLinkClasses} ring-2 ring-offset-4 ring-offset-pr-bg-main ring-pr-main hover:ring-pr-main`
      : `${staticLinkClasses} hover:ring-2 hover:ring-offset-4 hover:ring-offset-pr-bg-main hover:ring-pr-main-mute`;
  const logOutButtonClasses = `${staticLinkClasses} text-pr-error-soft hover:text-pr-error`;

  const navigation = useMemo(
    () => ({
      roots: {
        items: [
          {
            name: 'home',
            linkProps: {
              to: ROUTES.MAIN.ROOT,
              children: <HomeIcon />
            }
          },
          {
            name: 'books',
            linkProps: {
              to: ROUTES.MAIN.BOOK.ROOT,
              children: <BookOpenIcon />
            }
          },
          {
            name: 'search',
            linkProps: {
              to: ROUTES.MAIN.SEARCH,
              children: <MagnifyingGlassIcon />
            }
          }
        ],
        props: {
          className: 'grid gap-6'
        },
        linksClasses: commonLinkClasses
      },
      options: {
        items: [
          {
            name: 'settings',
            linkProps: {
              to: ROUTES.SETTINGS.ROOT,
              children: <Cog8ToothIcon />
            }
          },
          {
            name: 'logout',
            linkProps: {
              onClick: logOut,
              className: logOutButtonClasses,
              children: <ArrowLeftStartOnRectangleIcon />
            }
          }
        ],
        props: {
          className: 'grid gap-4'
        },
        linksClasses: commonLinkClasses
      },
      profile: {
        props: {
          to: '/profile',
          className: profileLinkClasses,
          children: (
            <ProfilePhoto imageUrl={user?.imageUrl} isLoading={isPending} className="size-full" />
          )
        }
      }
    }),
    [user?.imageUrl, isPending]
  );

  return (
    <Sidebar
      {...{
        className: `${className} w-16 h-screen gap-9 py-9 border-r-1`,
        header: <Logo text="L" />,
        main: <Navigation list={navigation.roots} className="flex justify-center items-start" />,
        footer: (
          <>
            <DropDown openingDirection="top" className="gap-2">
              <Navigation
                className="min-h-0 flex justify-center items-start"
                list={navigation.options}
              />
            </DropDown>
            <NavigationLink element={navigation.profile.element} {...navigation.profile.props} />
          </>
        )
      }}
    />
  );
};

export default MainSidebar;
