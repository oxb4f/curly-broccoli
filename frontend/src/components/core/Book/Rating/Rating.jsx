import Rating from '../../Rating/Rating';
import Skeleton from '../../Skeleton/Skeleton';
import useBookService from '../../../../hooks/useBookService';

const BookRating = ({ id, initialRating, isLoading, isRow, className = '' }) => {
  const { edit } = useBookService();

  const handleChange = async (value) => await edit(id, { rating: value });

  return isLoading ? (
    <Skeleton type="text" />
  ) : (
    <Rating
      initialRating={initialRating}
      onChange={handleChange}
      className={className}
      isRow={isRow}
    />
  );
};

export default BookRating;
