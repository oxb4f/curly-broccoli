import { useBook } from '@app/providers/BookProvider';
import BookReadingTracker from '@reading/components/Tracker';
import BookReadingRoadMap from '@reading/components/RoadMap';

const BookReadPage = () => {
  const { book } = useBook();

  return (
    <main className={`main relative gap-y-4 overflow-clip lg:content-cols-2`}>
      <div className="gap-y-4 content-rows-[calc(30lvh-1rem)_calc(70lvh-2rem)] lg:content-rows-1 lg:items-center">
        <div
          style={{
            backgroundImage: `url(${book?.imageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
          className="layout-full-width absolute inset-0 -z-20 animate-float-brightness motion-reduce:animate-none animation-duration-90000"
        ></div>
        <div
          style={{
            borderImage: 'linear-gradient(transparent, var(--project-bg-main-color) 90%) fill 1'
          }}
          className="layout-full-width absolute -inset-5 bg-pr-bg-main/85 backdrop-blur-3xl -z-10"
        ></div>

        <BookReadingTracker
          bookId={book?.id}
          className="w-full justify-self-center gap-y-8 px-8 py-4 rounded-2xl border-1 border-pr-border z-10 lg:col-1 lg:w-[30lvw] lg:h-auto lg:py-14 lg:aspect-square"
        />

        <BookReadingRoadMap
          bookId={book?.id}
          className="max-h-[70lvh] z-10 lg:h-full lg:max-h-[calc(100lvh-2rem)] lg:row-span-full lg:col-2"
        />
      </div>
    </main>
  );
};

export default BookReadPage;
