import './Main.css';

const MainLayout = ({ sidebar, main, footer }) => {
  return (
    <>
      {sidebar}
      <main className="main">{main}</main>
      {footer && <footer className="footer">{footer}</footer>}
    </>
  );
};

export default MainLayout;
