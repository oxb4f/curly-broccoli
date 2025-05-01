import { Outlet } from 'react-router';
import BaseLayout from '@shared/layouts/BaseLayout';
import AppSidebar from './Sidebar';

const AppLayout = () => {
  return (
    <BaseLayout
      {...{ sidebar: AppSidebar, main: () => <Outlet />, footer: <div className="p-20"></div> }}
    />
  );
};

export default AppLayout;
