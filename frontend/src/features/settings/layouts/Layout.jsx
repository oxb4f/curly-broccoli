import { Outlet } from 'react-router';
import BaseLayout from '@shared/layouts/BaseLayout';
import SettingsSidebar from './Sidebar';

const SettingsLayout = () => {
  return <BaseLayout {...{ sidebar: SettingsSidebar, main: Outlet }} />;
};

export default SettingsLayout;
