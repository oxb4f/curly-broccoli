import { useQueryClient } from '@tanstack/react-query';
import * as readingTrackersApi from '../services/api/readingTrackers';
import useNavigatedMutation from '@app/query/hooks/useNavigatedMutation';
import QUERY_KEYS from '@app/query/constants/queryKeys';

const useReadingTrackersService = (bookId) => {
  const queryClient = useQueryClient();
  console.log(bookId);

  const { mutateAsync: start } = useNavigatedMutation({
    mutationFn: () => readingTrackersApi.startTracker(bookId),
    onSuccess: (bookData) => {
      console.log(bookData);
      queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      // queryClient.setQueryData([...QUERY_KEYS.READING_TRACKERS.ALL, bookId], (oldBookData) => {
      //   console.log(bookData);
      //   console.log(oldBookData);

      //   return {
      //     ...oldBookData,
      //     ...bookData
      //   };
      // });
    }
  });

  const { mutateAsync: pause } = useNavigatedMutation({
    mutationFn: (id) => readingTrackersApi.pauseTracker(id, bookId),
    onSuccess: (bookData) => {
      // queryClient.removeQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      console.log(bookData);
      // queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      // queryClient.setQueryData(QUERY_KEYS.READING_TRACKERS.ALL, (oldBookData) => ({
      //   ...oldBookData,
      //   ...bookData
      // }));
    }
  });

  const { mutateAsync: resume } = useNavigatedMutation({
    mutationFn: (id) => readingTrackersApi.resumeTracker(id, bookId),
    onSuccess: (bookData) => {
      console.log(bookData);
      queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      // queryClient.invalidateQueries([...QUERY_KEYS.BOOKS.PRIVATE, bookData.id]);
      // queryClient.setQueryData(QUERY_KEYS.READING_TRACKERS.ALL, (oldBookData) => ({
      //   ...oldBookData,
      //   ...bookData
      // }));
    }
  });

  const { mutateAsync: finish } = useNavigatedMutation({
    mutationFn: (id) => readingTrackersApi.finishTracker(id, bookId),
    onSuccess: (bookData) => {
      console.log(bookData);
      queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      // queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      // queryClient.setQueryData(QUERY_KEYS.READING_TRACKERS.ALL, (oldBookData) => ({
      //   ...oldBookData,
      //   ...bookData
      // }));
    }
  });

  const { mutate: pauseInBackground } = useNavigatedMutation({
    mutationFn: (id) => readingTrackersApi.pauseTrackerInBackground(id, bookId),
    onSuccess: (newTrackerData) => {
      console.log(newTrackerData);
      // queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      // queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
      queryClient.setQueryData([...QUERY_KEYS.READING_TRACKERS.ALL, bookId], (oldTrackersData) => ({
        ...oldTrackersData,
        trackers: [newTrackerData]
      }));
    }
  });

  // const pauseInBackground = (id) => {
  //   queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
  //   readingTrackersApi.pauseTrackerInBackground(id, bookId);
  // };

  return { start, pause, resume, finish, pauseInBackground };
};

export default useReadingTrackersService;
