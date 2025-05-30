import BookUpsertForm from '../components/UpsertForm';

const BookEditPage = () => {
  return (
    <main className="main">
      <BookUpsertForm variant="edit" className="justify-self-center" />
    </main>
  );
};

export default BookEditPage;
