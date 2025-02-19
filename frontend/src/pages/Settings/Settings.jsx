import { Outlet } from 'react-router';
import MainLayout from '../../layouts/Main/Main';
import SettingsSidebar from '../../components/sidebars/Settings/Settings';

const SettingsPage = () => {
  return <MainLayout {...{ sidebar: <SettingsSidebar />, main: <Outlet /> }} />;
};

export default SettingsPage;
