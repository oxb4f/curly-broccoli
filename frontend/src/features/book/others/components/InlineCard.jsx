import BookInfo from '@book/shared/components/Info';
import BookImage from '@book/shared/components/Image';
import ROUTES from '@app/router/constants/routes';
import NavigationLink from '@shared/components/navigation/Link';

const BookOthersInlineCard = ({ data, isPrivate, onClick, className = '' }) => {
  const ActionTag = onClick ? 'button' : NavigationLink;
  const actionProps = onClick
    ? { type: 'button', onClick: () => onClick(data.id) }
    : {
        to: `${isPrivate ? ROUTES.MAIN.BOOK.PRIVATE.ROOT : ROUTES.MAIN.BOOK.PUBLIC.ROOT}/${data.id}`
      };

  return (
    <article
      className={`size-full rounded-[inherit] overflow-hidden isolate
      ${className}`}
    >
      <ActionTag
        {...actionProps}
        className="size-full inline-grid grid-cols-[12rem_minmax(12rem,1fr)] grid-rows-1 gap-x-2"
      >
        <BookImage
          imageUrl={data.imageUrl}
          className="h-full w-full transition-transform hover:scale-110"
          foregroundImageClassName="max-h-full max-w-full"
        />
        <div className="flex flex-col justify-center w-full pr-3 gap-2 ">
          <BookInfo className="max-h-24 text-base text-start truncate" data={data.info} short />
        </div>
      </ActionTag>
    </article>
  );
};

export default BookOthersInlineCard;
