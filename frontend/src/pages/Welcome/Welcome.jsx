import AppBanner from '../../components/core/AppBanner/AppBanner';
import Auth from '../../components/core/Auth/Auth';

export default function WelcomePage() {
  return (
    <main className="main">
      <section className="size-full flex justify-center items-center gap-8 animate-bump">
        <Auth
          className="
            max-w-md w-full flex flex-col items-center 
            lg:max-w-80 lg:animate-slide-in-from-right-full"
        />
        <AppBanner
          className="hidden gap-7 p-5
            lg:flex lg:animate-slide-in-from-left-1/3"
        />
      </section>
    </main>
  );
}
