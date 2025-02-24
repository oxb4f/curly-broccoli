import { Outlet } from 'react-router';
import MainLayout from '../../layouts/Main/Main';
import MainSidebar from '../../components/sidebars/Main/Main';

const MainPage = () => {
  return (
    <MainLayout
      {...{ sidebar: <MainSidebar />, main: <Outlet />, footer: <div className="p-20"></div> }}
    />
  );
};

export default MainPage;
