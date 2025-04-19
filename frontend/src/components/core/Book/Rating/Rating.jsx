import Rating from '../../Rating/Rating';
import Skeleton from '../../Skeleton/Skeleton';
import useBooksService from '../../../../hooks/useBooksService';

const BookRating = ({ id, initialRating, isLoading, isRow, className = '' }) => {
  const { edit } = useBooksService();

  const handleChange = async (value) => await edit({ id, inputData: { rating: value } });

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
