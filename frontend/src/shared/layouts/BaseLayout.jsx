const BaseLayout = ({ sidebar: Sidebar, main: Main, footer: Footer }) => {
  return (
    <>
      {<Sidebar className="sidebar" />}
      <main className="main">{Main && <Main />}</main>
      {Footer && <footer className="footer">{Footer}</footer>}
    </>
  );
};

export default BaseLayout;
