import DropDown from '../../core/DropDown/DropDown';
import Logo from '../../core/Logo/Logo';
import ProfilePhoto from '../../core/ProfilePhoto/ProfilePhoto';
import Navigation from '../../core/Navigation/Navigation';
import Sidebar from '../../core/Sidebar/Sidebar';
import './Main.css';
import {
  HomeIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';

const MainSidebar = () => {
  const navigationList = {
    roots: [
      {
        name: 'home',
        icon: HomeIcon,
        to: '/'
      },
      {
        name: 'books',
        icon: BookOpenIcon,
        to: '/books'
      },
      {
        name: 'search',
        icon: MagnifyingGlassIcon,
        to: '/search'
      }
    ],
    options: [
      {
        name: 'settings',
        icon: Cog8ToothIcon,
        to: '/settings'
      },
      {
        name: 'logout',
        icon: ArrowLeftStartOnRectangleIcon,
        to: '/auth'
      }
    ]
  };

  return (
    <Sidebar
      {...{
        header: <Logo text="L" />,
        main: <Navigation list={navigationList.roots} />,
        footer: (
          <>
            <DropDown openingDirection="top">
              <Navigation list={navigationList.options} />
            </DropDown>
            <Navigation to="/profile">
              <ProfilePhoto className="sidebar__profile-photo" />
            </Navigation>
          </>
        )
      }}
    />
  );
};

export default MainSidebar;
