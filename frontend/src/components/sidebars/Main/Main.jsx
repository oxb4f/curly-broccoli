import DropDown from '../../core/DropDown/DropDown';
import Logo from '../../core/Logo/Logo';
import AsyncProfilePhoto from '../../asyncs/Profile/Photo';
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
import useUserService from '../../../hooks/useUserService';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import { useMemo } from 'react';

const MainSidebar = () => {
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
            icon: HomeIcon,
            args: {
              to: ROUTES.MAIN.ROOT,
              className: commonLinkClasses
            }
          },
          {
            name: 'books',
            icon: BookOpenIcon,
            args: {
              to: ROUTES.MAIN.BOOK.ROOT,
              className: commonLinkClasses
            }
          },
          {
            name: 'search',
            icon: MagnifyingGlassIcon,
            args: {
              to: '/search',
              className: commonLinkClasses
            }
          }
        ],
        args: {
          className: 'grid gap-6'
        }
      },
      options: {
        items: [
          {
            name: 'settings',
            icon: Cog8ToothIcon,
            args: {
              to: ROUTES.SETTINGS.ROOT,
              className: commonLinkClasses
            }
          },
          {
            name: 'logout',
            icon: ArrowLeftStartOnRectangleIcon,
            args: {
              onClick: logOut,
              className: logOutButtonClasses
            }
          }
        ],
        args: {
          className: 'grid gap-4'
        }
      },
      profile: {
        element: (
          <AsyncProfilePhoto
            imageUrl={user?.imageUrl}
            isPending={isPending}
            className="size-full"
          />
        ),
        args: {
          to: '/profile',
          className: profileLinkClasses
        }
      }
    }),
    [user?.imageUrl, isPending]
  );

  return (
    <Sidebar
      {...{
        className: 'w-16 h-screen gap-9 py-9 border-r-1',
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
            <NavigationLink element={navigation.profile.element} {...navigation.profile.args} />
          </>
        )
      }}
    />
  );
};

export default MainSidebar;
