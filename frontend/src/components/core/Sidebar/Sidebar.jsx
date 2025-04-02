const Sidebar = ({ header, main, footer, className = '' }) => {
  return (
    <aside className={`flex flex-col items-center border-pr-border bg-pr-bg-main ${className}`}>
      {header && <header>{header}</header>}
      <div className="grow">{main}</div>
      {footer && <footer className="flex flex-col gap-6 items-center">{footer}</footer>}
    </aside>
  );
};

export default Sidebar;
