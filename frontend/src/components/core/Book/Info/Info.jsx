const BookInfo = ({ data, isShort = false, className = '' }) => {
  const shortClassName = isShort ? 'overflow-hidden text-ellipsis whitespace-nowrap ' : '';

  return (
    <section className={`text-pr-text ${className}`}>
      <h3 className={`text-[1.1em]/[1.6em] font-bold ${shortClassName}`}>Book name</h3>
      <p className={`text-[0.8em]/[1.2em] ${shortClassName}`}>Book author</p>
      {data?.other && (
        <p className={`py-8 text-[0.75em]/[1.2em] ${isShort ? 'hidden' : 'block'}`}>{data.other}</p>
      )}
    </section>
  );
};

export default BookInfo;
