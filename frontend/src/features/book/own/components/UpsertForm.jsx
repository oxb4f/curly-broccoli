import BookImageUpload from './ImageUpload';
import useBookService from '@book/shared/hooks/useBookService';
import BookOthersList from '@book/others/components/List';
import { getPublicBook, quickSearchPublicBooks } from '@book/shared/services/api/book';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getReferences } from '@shared/services/api/references';
import AsyncForm from '@shared/components/form/AsyncForm';
import { useBook } from '@app/providers/BookProvider';
import { useState } from 'react';

const BookUpsertForm = ({ variant, className = '' }) => {
  const { create, edit } = useBookService();

  const [selectedBookId, setSelectedBookId] = useState(null);
  const { data: selectedBook, isPending: isSelectedBookPending } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS.PUBLIC.BOOK, selectedBookId],
    queryFn: () => getPublicBook(selectedBookId),
    enabled: Boolean(selectedBookId)
  });

  const { book: providedBook, isPending: isProvidedBookPending } = useBook();

  const { data: references, isPending: isReferencesPending } = useQuery({
    queryKey: QUERY_KEYS.REFERENCES.ALL,
    queryFn: getReferences
  });

  const autofillBook = selectedBook ?? providedBook ?? {};

  const handleSubmit = async (bookData) => {
    if (variant === 'create') {
      await create(bookData);
    } else if (variant === 'edit') {
      await edit({ id: providedBook.id, inputData: bookData }, { navigateTo: -1 });
    }
  };

  const handleItemClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  const fields = {
    image: {
      element: BookImageUpload,
      value: autofillBook?.imageUrl,
      hint: 'Use your own photo or it will be default',
      props: {
        className: 'size-full max-h-[60vh] xl:max-h-[90vh]'
      }
    },
    description: {
      fields: {
        title: {
          type: 'search',
          label: 'Title',
          value: autofillBook?.info?.title,
          queryOptions: {
            select: (data) => data.books,
            queryKey: QUERY_KEYS.BOOKS.PUBLIC.LIST,
            queryFn: (value) => quickSearchPublicBooks({ term: value })
          },
          children: (books) => (
            <BookOthersList
              variant="inline"
              items={books}
              itemClickHandler={handleItemClick}
              className="max-h-56 px-2 py-6 overflow-y-auto"
              itemsClassName="rounded-2xl hover:bg-pr-main/10"
            />
          ),
          labelClassName: 'z-30',
          className: 'transition-all',
          containerClassName: 'z-20',
          dropdownClassName: 'bg-pr-main/5 backdrop-blur origin-top scale-x-100 transition-all'
        },
        author: {
          type: 'text',
          label: 'Author',
          value: autofillBook?.info?.author
        },
        info: {
          fields: {
            numberOfPages: {
              type: 'number',
              label: 'Number of pages',
              value: autofillBook?.info?.other?.numberOfPages
            },
            genre: {
              type: 'select',
              options: references?.bookGenres?.map((reference) => ({
                value: reference,
                label: reference
              })),
              label: 'Genre',
              value: autofillBook?.info?.other?.genre,
              dropdownClassName: 'max-h-64 py-4 overflow-y-auto bg-pr-main/5 backdrop-blur',
              optionsClassName: 'rounded-2xl hover:bg-pr-main/10'
            }
          },
          className: 'flex gap-4'
        },
        isbn: {
          type: 'text',
          label: 'Isbn',
          value: autofillBook?.info?.other?.isbn
        },
        description: {
          type: 'textarea',
          label: 'Description',
          className: 'min-h-40 max-h-72',
          value: autofillBook?.info?.other?.description
        },
        upsertBook: {
          type: 'submit',
          children: variant === 'create' ? 'Create book' : variant === 'edit' ? 'Edit book' : ''
        }
      },
      className: 'flex flex-col gap-2 min-w-96'
    }
  };

  // const handleSubmit = (userData) => changeInfo(userData);

  return (
    <AsyncForm
      className={`size-full max-w-6xl grid grid-rows-[60vh_auto] gap-4 xl:grid-cols-[1fr_1fr] xl:grid-rows-[90vh] ${className}`}
      isLoading={isProvidedBookPending || isReferencesPending}
      fields={fields}
      onSubmit={handleSubmit}
    />
  );
};

export default BookUpsertForm;
