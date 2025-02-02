import './WelcomePage.css';
import MainLayout from '../../layouts/MainLayout';
import AppBanner from '../../components/core/AppBanner/AppBanner';
import Auth from '../../components/core/Auth/Auth';

export default function WelcomePage() {
  return (
    <MainLayout
      {...{
        main: (
          <section className="welcome-window scale-animation">
            <Auth />
            <AppBanner />
          </section>
        )
      }}
    />
  );
}
