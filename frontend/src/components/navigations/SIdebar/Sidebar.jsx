import './Sidebar.css';
import Navigation from '@/components/core/Navigation/Navigation';

const SidebarNavigation = (props) => {
  return <Navigation {...props} className="sidebar__navigation" />;
};

export default SidebarNavigation;
