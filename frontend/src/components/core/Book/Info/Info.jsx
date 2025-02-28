import './Info.css';

const BookInfo = ({ data, className = '' }) => {
  return (
    <section className={`book-info ${className}`}>
      <h3 className="book-info__name">Book name</h3>
      <p className="book-info__author">Book author</p>
      {data?.other && <p className="book-info__other">{data.other}</p>}
    </section>
  );
};

export default BookInfo;
