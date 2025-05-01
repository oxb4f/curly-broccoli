import { useMemo } from 'react';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import BaseSidebar from '@shared/layouts/BaseSidebar';
import Navigation from '@shared/components/navigation/Navigation';
import NavigationLink from '@shared/components/navigation/Link';
import ROUTES from '@app/router/constants/routes';

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
        props: {
          to: ROUTES.MAIN.ROOT,
          className: backLinkClasses,
          children: <ArrowLeftCircleIcon />
        }
      },
      settings: {
        items: [
          {
            name: 'profile',
            linkProps: {
              to: ROUTES.SETTINGS.PROFILE,
              children: 'Profile settings'
            }
          },
          {
            name: 'books',
            linkProps: {
              to: ROUTES.SETTINGS.SECURITY,
              children: 'Sequrity settings'
            }
          }
        ],
        linksClasses: commonLinkClasses
      }
    }),
    []
  );

  return (
    <BaseSidebar
      {...{
        className: 'min-w-max h-screen py-9 border-r-1',
        header: <NavigationLink icon={navigation.back.icon} {...navigation.back.props} />,
        main: <Navigation list={navigation.settings} />
      }}
    />
  );
};

export default SettingsSidebar;
