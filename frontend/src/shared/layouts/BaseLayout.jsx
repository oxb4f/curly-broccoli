const BaseLayout = ({ sidebar: Sidebar, main: Main, footer: Footer }) => {
  return (
    <>
      {Sidebar && <Sidebar className="sidebar" />}
      {Main && <Main />}
      {Footer && <footer className="footer">{Footer}</footer>}
    </>
  );
};

export default BaseLayout;
