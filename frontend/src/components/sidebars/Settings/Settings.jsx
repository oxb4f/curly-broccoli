import Sidebar from '../../core/Sidebar/Sidebar';
import Navigation from '../../core/Navigation/Navigation';
import NavigationLink from '../../core/Navigation/Link/Link';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import ROUTES from '../../../constants/routes';
import { useMemo } from 'react';

const SettingsSidebar = () => {
  const staticLinkClasses =
    'block p-3 border-b-1 text-center border-pr-border transition-all ease-out';
  const backLinkClasses = 'inline-block size-9 text-pr-text hover:text-pr-text-darker';
  const commonLinkClasses = ({ isActive }) =>
    isActive
      ? `${staticLinkClasses} text-pr-main hover:text-pr-main`
      : `${staticLinkClasses} text-pr-text hover:text-pr-text-darker`;

  const navigation = useMemo(
    () => ({
      back: {
        icon: ArrowLeftCircleIcon,
        args: {
          to: ROUTES.MAIN.ROOT,
          className: backLinkClasses
        }
      },
      settings: {
        items: [
          {
            name: 'profile',
            text: 'Profile settings',
            args: {
              to: ROUTES.SETTINGS.PROFILE,
              className: commonLinkClasses
            }
          },
          {
            name: 'books',
            text: 'Sequrity settings',
            args: {
              to: ROUTES.SETTINGS.SECURITY,
              className: commonLinkClasses
            }
          }
        ]
      }
    }),
    []
  );

  return (
    <Sidebar
      {...{
        className: 'min-w-max h-screen py-9 border-r-1',
        header: <NavigationLink icon={navigation.back.icon} {...navigation.back.args} />,
        main: <Navigation list={navigation.settings} />
      }}
    />
  );
};

export default SettingsSidebar;
