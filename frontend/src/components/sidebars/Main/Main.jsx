import DropDown from '../../core/DropDown/DropDown';
import Logo from '../../core/Logo/Logo';
import AsyncProfilePhoto from '../../asyncs/Profile/Photo';
import Sidebar from '../../core/Sidebar/Sidebar';
import SidebarNavigation from '../../navigations/SIdebar/Sidebar';
import './Main.css';
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

const MainSidebar = () => {
  const { user, isPending } = useSession();
  const { logOut } = useUserService();

  const navigation = {
    roots: [
      {
        name: 'home',
        icon: <HomeIcon />,
        to: ROUTES.MAIN.ROOT
      },
      {
        name: 'books',
        icon: <BookOpenIcon />,
        to: '/books'
      },
      {
        name: 'search',
        icon: <MagnifyingGlassIcon />,
        to: '/search'
      }
    ],
    options: [
      {
        name: 'settings',
        icon: <Cog8ToothIcon />,
        to: ROUTES.SETTINGS.ROOT
      },
      {
        name: 'logout',
        icon: <ArrowLeftStartOnRectangleIcon />,
        onClick: logOut
      }
    ],
    profile: {
      icon: (
        <AsyncProfilePhoto
          className="sidebar__profile-photo"
          imageUrl={user?.imageUrl}
          isPending={isPending}
        />
      ),
      to: '/profile'
    }
  };

  return (
    <Sidebar
      {...{
        className: 'main-sidebar',
        header: <Logo text="L" />,
        main: <SidebarNavigation list={navigation.roots} />,
        footer: (
          <>
            <DropDown openingDirection="top">
              <SidebarNavigation list={navigation.options} />
            </DropDown>
            <SidebarNavigation item={navigation.profile} />
          </>
        )
      }}
    />
  );
};

export default MainSidebar;
