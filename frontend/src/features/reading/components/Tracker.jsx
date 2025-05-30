import { useBeforeUnload } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Timer from '@shared/components/ui/Timer';
import PlayButton from '@shared/components/ui/buttons/Play';
import useReadingTrackersService from '@reading/hooks/useReadingTrackersService';
import useUnmount from '@shared/hooks/useUnmount';
import { getTrackers } from '@reading/services/api/readingTrackers';
import QUERY_KEYS from '@app/query/constants/queryKeys';
import useBackForwardFix from '@app/router/hooks/useBackForwardFix';
import Skeleton from '@shared/components/ui/Skeleton';

const BookReadingTracker = ({ bookId, className = '' }) => {
  const { start, pause, resume, finish, pauseInBackground } = useReadingTrackersService(bookId);

  const { data: tracker, isPending } = useQuery({
    queryFn: () => getTrackers(bookId, { limit: 1 }),
    queryKey: [...QUERY_KEYS.READING_TRACKERS.ALL, bookId],
    enabled: Boolean(bookId),
    select: (data) => data.trackers[0]
  });

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

    pauseInBackground(tracker.id);
  };

  useUnmount(handleUnmount, [tracker?.state?.isReading]);
  useBeforeUnload(handleUnmount);
  useBackForwardFix();

  const nextAction = tracker?.state?.isReading
    ? 'pause'
    : tracker?.state?.isPaused
    ? 'resume'
    : 'start';

  return (
    <section
      className={`min-w-max grid grid-rows-[1fr_1fr] justify-center items-center transition-[grid-template-columns] text-[clamp(3rem,5lvw,6rem)] ${
        tracker?.state?.isStarted ? 'grid-cols-[1fr_1fr]' : 'grid-cols-[0fr_1fr]'
      } ${className}`}
    >
      {!isPending ? (
        <Timer
          initialSeconds={tracker?.totalDuration / 1000}
          isStarted={tracker?.state?.isReading}
          isStopped={tracker?.state?.isFinished}
          className={`col-span-full text-center font-mono font-bold tracking-tight ${
            tracker?.state?.isStarted
              ? `text-pr-text transition-all ${tracker?.state?.isReading ? 'animate-pulse' : ''}`
              : ''
          }`}
        />
      ) : (
        <Skeleton type="text" className="col-span-full" />
      )}
      <PlayButton
        action="stop"
        onClick={() => handleDispatch('finish')}
        className={`size-[clamp(3rem,5lvw,6rem)] justify-self-center min-w-0 overflow-clip ${
          tracker?.state?.isStarted ? '' : 'opacity-0 -z-10 size-0! border-0!'
        }`}
      />
      <PlayButton
        action={nextAction}
        onClick={() => handleDispatch(nextAction)}
        className={`size-[clamp(3rem,5lvw,6rem)] justify-self-center ${
          nextAction === 'pause' ? 'animate-pulse' : ''
        }`}
      />
    </section>
  );
};

export default BookReadingTracker;
