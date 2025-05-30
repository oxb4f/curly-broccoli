import BookUpsertForm from '../components/UpsertForm';

const BookCreatePage = () => {
  // const params = useParams();

  return (
    <main className="main">
      <BookUpsertForm variant="create" className="justify-self-center" />
    </main>
  );
};

export default BookCreatePage;
