import './Sidebar.css';

const Sidebar = ({ header, main, footer }) => {
  return (
    <aside className="sidebar">
      <header className="sidebar__header">{header}</header>
      <div className="sidebar__main">{main}</div>
      <footer className="sidebar__footer">{footer}</footer>
    </aside>
  );
};

export default Sidebar;
