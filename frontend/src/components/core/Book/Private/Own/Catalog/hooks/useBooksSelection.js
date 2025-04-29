import { useState } from 'react';

const useBooksSelection = (items) => {
  const [selectedBooks, setSelectedBooks] = useState(new Set());
  console.log(selectedBooks);

  const isAllSelected = items.length === selectedBooks.size;

  const select = (bookId) => {
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

  const selectAll = () => {
    const newData = isAllSelected ? null : items.map((item) => item.id);
    setSelectedBooks(new Set(newData));
  };

  const clearSelection = () => {
    setSelectedBooks(new Set());
  };

  return {
    isAllSelected,
    selectedBooks,
    select,
    selectAll,
    clearSelection
  };
};

export default useBooksSelection;
