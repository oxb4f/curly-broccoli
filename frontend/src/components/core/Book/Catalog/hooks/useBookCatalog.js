import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useBookService from '../../../../../hooks/useBookService';
import QUERY_KEYS from '../../../../../constants/queryKeys';

const useBookCatalog = (items) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState(new Set());
  const queryClient = useQueryClient();
  const { remove } = useBookService();
  console.log(selectedBooks);

  const isAllSelected = items.length === selectedBooks.size;

  const removeMutation = useMutation({
    mutationFn: (bookId) => remove(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.BOOKS.PRIVATE);
    }
  });

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setSelectedBooks(new Set());
  };

  const handleSelect = (bookId) => {
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const newData = isAllSelected ? null : items.map((item) => item.id);
    setSelectedBooks(new Set(newData));
  };

  const handleRemove = async () => {
    if (removeMutation.isPending) return;

    await Promise.all(
      Array.from(selectedBooks).map((bookId) => removeMutation.mutateAsync(bookId))
    );

    toggleEditMode();
  };

  return {
    editMode,
    isAllSelected,
    selectedBooks,
    toggleEditMode,
    handleSelect,
    handleSelectAll,
    handleRemove
  };
};

export default useBookCatalog;
