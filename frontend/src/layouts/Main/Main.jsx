const MainLayout = ({ sidebar: Sidebar, main: Main, footer: Footer }) => {
  return (
    <>
      {<Sidebar className="sidebar" />}
      <main className="main">{<Main />}</main>
      {Footer && <footer className="footer">{Footer}</footer>}
    </>
  );
};

export default MainLayout;
