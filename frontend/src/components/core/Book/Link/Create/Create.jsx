import ROUTES from '../../../../../constants/routes';
import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import NavigationLink from '../../../Navigation/Link/Link';

const BookCreateLink = ({ className = '' }) => {
  return (
    <NavigationLink
      to={ROUTES.MAIN.BOOK.CREATE}
      className={`group relative flex justify-center items-center border-2 border-pr-bg-secondary rounded-md bg-pr-bg-secondary transition-colors 
            hover:border-pr-text 
            before:content-[''] before:absolute before:inset-0 before:rounded-md before:bg-pr-bg-main before:scale-100 before:transition-transform 
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
