import iphoneScreen from '@/assets/images/iphone-screen.png';
import googlePlayDownload from '@/assets/images/google-play-download.png';
import appStoreDownload from '@/assets/images/app-store-download.png';

const AppBanner = ({ className = '' }) => {
  return (
    <article className={`border border-pr-border bg-pr-bg-secondary ${className}`}>
      <img src={iphoneScreen} alt="iphone-screen" className="max-w-44 max-h-96" />
      <div className="flex flex-col justify-center gap-6 max-w-96 min-w-56 text-center break-words">
        <h1 className="text-3xl">Download the application</h1>
        <p className="text-pr-text-darker">
          Our app is made for people who want read their favorite books and share their thoughts
          with like-minded people
        </p>
        <nav className="flex justify-center gap-4 flex-wrap">
          <a href="#" className="hover:opacity-75">
            <img src={googlePlayDownload} className="h-10" alt="Google Play Download" />
          </a>
          <a href="#" className="hover:opacity-75">
            <img src={appStoreDownload} className="h-10" alt="App Store Download" />
          </a>
        </nav>
      </div>
    </article>
  );
};

export default AppBanner;
