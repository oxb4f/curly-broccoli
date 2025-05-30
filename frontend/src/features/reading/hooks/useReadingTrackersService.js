import { useQueryClient } from '@tanstack/react-query';
import * as readingTrackersApi from '../services/api/readingTrackers';
import useNavigatedMutation from '@app/query/hooks/useNavigatedMutation';
import QUERY_KEYS from '@app/query/constants/queryKeys';

const useReadingTrackersService = (bookId) => {
  const queryClient = useQueryClient();

  const { mutateAsync: start } = useNavigatedMutation({
    mutationFn: () => readingTrackersApi.startTracker(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
    }
  });

  const { mutateAsync: pause } = useNavigatedMutation({
    mutationFn: (id) => readingTrackersApi.pauseTracker(id, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
    }
  });

  const { mutateAsync: resume } = useNavigatedMutation({
    mutationFn: (id) => readingTrackersApi.resumeTracker(id, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
    }
  });

  const { mutateAsync: finish } = useNavigatedMutation({
    mutationFn: (id) => readingTrackersApi.finishTracker(id, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries([...QUERY_KEYS.READING_TRACKERS.ALL, bookId]);
    }
  });

  const { mutate: pauseInBackground } = useNavigatedMutation({
    mutationFn: (id) => readingTrackersApi.pauseTrackerInBackground(id, bookId),
    onSuccess: (newTrackerData) => {
      queryClient.setQueryData([...QUERY_KEYS.READING_TRACKERS.ALL, bookId], (oldTrackersData) => ({
        ...oldTrackersData,
        trackers: [newTrackerData]
      }));
    }
  });

  return { start, pause, resume, finish, pauseInBackground };
};

export default useReadingTrackersService;
