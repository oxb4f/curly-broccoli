import AuthAppBanner from '@auth/components/AppBanner';
import AuthWindow from '@auth/components/Window';

export default function WelcomePage() {
  return (
    <main className="main">
      <section className="size-full flex justify-center items-center gap-8 animate-bump">
        <AuthWindow
          className="
            max-w-md w-full flex flex-col items-center 
            lg:max-w-80 lg:animate-slide-in-from-right-full"
        />
        <AuthAppBanner
          className="hidden gap-7 p-5
            lg:flex lg:animate-slide-in-from-left-1/3"
        />
      </section>
    </main>
  );
}
