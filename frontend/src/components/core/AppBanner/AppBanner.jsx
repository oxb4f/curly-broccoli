import './AppBanner.css';
import iphoneScreen from '@/assets/images/iphone-screen.png';
import googlePlayDownload from '@/assets/images/google-play-download.png';
import appStoreDownload from '@/assets/images/app-store-download.png';

const AppBanner = () => {
  return (
    <article className="app-banner">
      <div className="app-banner__showcase">
        <img src={iphoneScreen} alt="iphone-screen" className="app-banner__phone-screen" />
      </div>
      <div className="app-banner__content">
        <header className="app-banner__header">
          <h1>Download the application</h1>
        </header>
        <main className="app-banner__description description">
          Our app is made for people who want read their favorite books and share their thoughts
          with like-minded people
        </main>
        <footer className="app-banner__footer">
          <a href="#" className="media-content__download-link link">
            <img
              src={googlePlayDownload}
              className="app-banner__download-image"
              alt="Google Play Download"
            />
          </a>
          <a href="#" className="app-banner__download-link link">
            <img
              src={appStoreDownload}
              className="app-banner__download-image"
              alt="App Store Download"
            />
          </a>
        </footer>
      </div>
    </article>
  );
};

export default AppBanner;
