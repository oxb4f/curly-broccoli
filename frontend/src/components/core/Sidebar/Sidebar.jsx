import './Sidebar.css';

const Sidebar = ({ header, main, footer, className = '' }) => {
  return (
    <aside className={`sidebar ${className}`}>
      {header && <header className="sidebar__header">{header}</header>}
      <div className="sidebar__main">{main}</div>
      {footer && <footer className="sidebar__footer">{footer}</footer>}
    </aside>
  );
};

export default Sidebar;
