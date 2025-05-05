import { BookOpenIcon } from '@heroicons/react/24/solid';
import StringParallaxSection from '@shared/components/ui/StringParallaxSection';

const BookImage = ({ imageUrl, parallax, foregroundImageClasses = '', className = '' }) => {
  return imageUrl ? (
    <StringParallaxSection
      imageUrl={imageUrl}
      visiblePercentageBoundaries={20}
      speedMultiplier={parallax ? 0.2 : 0}
      as="figure"
      className={`flex justify-center items-center ${className}`}
    >
      <img
        src={imageUrl}
        alt="Book image"
        className={`w-full h-min max-h-full align-top text-center object-contain z-0 ${foregroundImageClasses}`}
      />
    </StringParallaxSection>
  ) : (
    <BookOpenIcon className="size-full" />
  );
};

export default BookImage;
