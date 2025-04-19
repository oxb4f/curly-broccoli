import { useState } from 'react';
import useBooksService from '../../../../../hooks/useBooksService';

const useBookCatalog = (items) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState(new Set());
  const { remove } = useBooksService();
  console.log(selectedBooks);

  const isAllSelected = items.length === selectedBooks.size;

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
    await Promise.all(Array.from(selectedBooks).map((bookId) => remove(bookId)));

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
