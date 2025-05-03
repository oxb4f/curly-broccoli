import BookTitle from './Title';
import BookAuthor from './Author';
import BookOtherInfo from './OtherInfo';

const BookInfo = ({ data, isLoading, short, className = '' }) => {
  const shortClassName = short ? 'truncate' : 'max-h-24 overflow-y-auto break-words';

  return (
    <section className={`text-pr-text ${className}`}>
      <BookTitle
        title={data?.title}
        isLoading={isLoading}
        as={short ? 'h2' : 'h1'}
        className={`text-[1.1em]/[1.6em] font-bold ${shortClassName}`}
      />
      <BookAuthor
        author={data?.author}
        isLoading={isLoading}
        as="p"
        className={`text-[0.8em]/[1.2em] ${shortClassName}`}
      />
      {!short && <BookOtherInfo otherInfo={data?.other} isLoading={isLoading} />}
    </section>
  );
};

export default BookInfo;
