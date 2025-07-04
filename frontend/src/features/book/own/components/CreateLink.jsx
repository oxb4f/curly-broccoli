import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import ROUTES from '@app/router/constants/routes';
import NavigationLink from '@shared/components/navigation/Link';

const BookCreateLink = ({ className = '' }) => {
  return (
    <NavigationLink
      to={ROUTES.MAIN.BOOK.CREATE}
      className={`group relative flex justify-center items-center border-2 border-pr-border bg-pr-bg-secondary transition-colors will-change-contents
            hover:border-pr-text 
            before:absolute before:inset-0 before:rounded-[inherit] before:bg-pr-bg-main before:scale-100 before:transition-transform 
            lg:hover:before:scale-0 ${className}`}
    >
      <PlusIcon
        className="absolute size-2/3 transition-all duration-150 opacity-100 
              lg:rotate-0 lg:group-hover:opacity-0 lg:group-hover:rotate-180"
      />
      <BookOpenIcon
        className="absolute size-2/3 transition-all duration-150 opacity-0 
              lg:rotate-180 lg:group-hover:opacity-100 lg:group-hover:rotate-[360deg] lg:group-hover:delay-150"
      />
    </NavigationLink>
  );
};

export default BookCreateLink;
