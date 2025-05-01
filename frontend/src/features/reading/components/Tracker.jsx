import { useBeforeUnload } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Timer from '@shared/components/ui/Timer';
import PlayButton from '@shared/components/ui/buttons/Play';
import useReadingTrackersService from '@reading/hooks/useReadingTrackersService';
import useUnmount from '@shared/hooks/useUnmount';
import { getTrackers } from '@reading/services/api/readingTrackers';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import useBackForwardFix from '@app/router/hooks/useBackForwardFix';

const BookReadingTracker = ({ bookId, className = '' }) => {
  const { start, pause, resume, finish, pauseInBackground } = useReadingTrackersService(bookId);

  const { data: tracker, isPending } = useQuery({
    queryFn: () => getTrackers(bookId, { limit: 1 }),
    queryKey: [...QUERY_KEYS.READING_TRACKERS.ALL, bookId],
    enabled: Boolean(bookId),
    select: (data) => data.trackers[0]
  });

  // finish(72884864276);

  console.log(tracker);

  const handleDispatch = async (type) => {
    switch (type) {
      case 'start':
        if (tracker?.id && !tracker?.state?.isFinished) return;
        await start();
        break;
      case 'pause':
        if (!tracker?.id || !tracker?.state?.isReading) return;
        await pause(tracker.id);
        break;
      case 'resume':
        if (!tracker?.id || !tracker?.state?.isPaused) return;
        await resume(tracker.id);
        break;
      case 'finish':
        if (!tracker?.id || !tracker?.state?.isStarted) return;
        await finish(tracker.id);
        break;
    }
  };

  const handleUnmount = () => {
    if (!tracker?.id || !tracker?.state?.isReading) return;
    console.log('unmounting');

    pauseInBackground(tracker.id);
  };

  useUnmount(handleUnmount, [tracker?.state?.isReading]);
  useBeforeUnload(handleUnmount);
  useBackForwardFix();

  // useEffect(() => {
  //   const handleDocumentHidden = () => {
  //     if (document.visibilityState === 'hidden') {
  //       if (!tracker?.id || !tracker?.state?.isReading) return;
  //       pauseInBackground(tracker.id);
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleDocumentHidden);
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleDocumentHidden);
  //   };
  // }, [tracker?.state?.isReading]);

  const nextAction = tracker?.state?.isReading
    ? 'pause'
    : tracker?.state?.isPaused
    ? 'resume'
    : 'start';

  return (
    <div className={`relative flex justify-center items-center gap-7 text-2xl ${className}`}>
      {!isPending && (
        <Timer
          initialSeconds={tracker?.totalDuration / 1000}
          isStarted={tracker?.state?.isReading}
          isStopped={tracker?.state?.isFinished}
          className={`absolute top-1/2 -mt-4 -z-10 ${
            tracker?.state?.isStarted
              ? `translate-x-full text-pr-text transition-all ${
                  tracker?.state?.isReading ? 'animate-pulse' : ''
                }`
              : 'text-transparent'
          }`}
        />
      )}
      <PlayButton
        action="stop"
        onClick={() => handleDispatch('finish')}
        className={`absolute scale-75 ${
          tracker?.state?.isStarted ? '-translate-x-[110%]' : 'opacity-0 -z-10'
        }`}
      />
      <PlayButton
        action={nextAction}
        onClick={() => handleDispatch(nextAction)}
        className={nextAction === 'pause' ? 'animate-pulse' : ''}
      />
    </div>
  );
};

export default BookReadingTracker;
