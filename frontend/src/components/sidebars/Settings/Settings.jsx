import Sidebar from '../../core/Sidebar/Sidebar';
import SidebarNavigation from '../../navigations/SIdebar/Sidebar';
import './Settings.css';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import ROUTES from '../../../constants/routes';

const SettingsSidebar = () => {
  const navigation = {
    back: {
      icon: <ArrowLeftCircleIcon />,
      to: ROUTES.MAIN.ROOT
    },
    settings: [
      {
        name: 'profile',
        text: 'Profile settings',
        to: ROUTES.SETTINGS.PROFILE
      },
      {
        name: 'books',
        text: 'Sequrity settings',
        to: ROUTES.SETTINGS.SECURITY
      }
    ]
  };

  return (
    <Sidebar
      {...{
        className: 'settings-sidebar',
        header: <SidebarNavigation item={navigation.back} />,
        main: <SidebarNavigation list={navigation.settings} />
      }}
    />
  );
};

export default SettingsSidebar;
