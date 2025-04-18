import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useBookService from '../../../../hooks/useBookService';
import BookPhoto from '../../../../components/core/Book/Photo/Photo';
import Timer from '../../../../components/core/Timer/Timer';
import { useState } from 'react';
import PlayButton from '../../../../components/core/Button/Play/Play';
import formatDate from '../../../../utils/formatDate';
import QUERY_KEYS from '../../../../constants/queryKeys';

const BookReadPage = () => {
  const [timerStatus, setTimerStatus] = useState('stopped');
  const buttonAction = timerStatus === 'started' ? 'pause' : 'start';
  const { bookId } = useParams();
  const { get } = useBookService();
  const {
    data: book,
    isPending,
    error,
    refetch
  } = useQuery({
    queryKey: [...QUERY_KEYS.BOOKS.PRIVATE, bookId],
    queryFn: () => get(bookId, false)
  });

  console.log(timerStatus);

  const getNextTimerStatus = (currentStatus) => {
    if (currentStatus === 'started') {
      return 'paused';
    } else {
      return 'started';
    }
  };

  const handleTimerStart = () => {
    setTimerStatus((prev) => getNextTimerStatus(prev));
    // edit(bookId, { isStarted: true });
  };

  const handleTimerStop = () => {
    setTimerStatus('stopped');
    // edit(bookId, { isStarted: true });
  };

  console.dir(book);

  return (
    <section className="size-full flex flex-col gap-x-5 gap-y-2 justify-around">
      <BookPhoto imageUrl={book?.imageUrl} className="w-full h-[30vh]" />
      <div className="relative w-full flex justify-center gap-7 text-2xl">
        <Timer
          isStarted={timerStatus === 'started'}
          isStopped={timerStatus === 'stopped'}
          className={`absolute top-1/2 -mt-4 -z-10 ${
            timerStatus !== 'stopped'
              ? `translate-x-full text-pr-text transition-all ${
                  timerStatus === 'started' ? 'animate-pulse' : ''
                }`
              : 'text-transparent'
          }`}
        />
        <PlayButton
          action="stop"
          onClick={handleTimerStop}
          className={`absolute scale-75 ${
            timerStatus === 'paused' ? '-translate-x-[110%]' : 'opacity-0 -z-10'
          }`}
        />
        <PlayButton
          action={buttonAction}
          onClick={handleTimerStart}
          className={buttonAction === 'pause' ? 'animate-pulse' : ''}
        />
      </div>
      <section className="p-3 max-h-72 rounded-md border-1 border-pr-border overflow-y-auto">
        <h1 className="text-2xl">Statistics</h1>
        <ul className="relative pl-6 before:absolute before:left-1 before:top-1 before:block before:w-1 before:h-full before:bg-pr-main before:translate-x-1/2">
          <li
            className="relative min-h-20 
					after:absolute after:-left-6 after:top-1 after:block after:size-4 after:rounded-full after:border-4 after:border-pr-main-soft after:bg-pr-bg-main"
          >
            <p className="">Last read: {formatDate(new Date(Date.now()), { relative: true })}</p>
            <ul>
              <li className="py-4 text-2xl">30m</li>
              <li className="py-4 text-2xl">30m</li>
            </ul>
          </li>
          <li
            className="relative h-20
					after:absolute after:-left-6 after:top-1 after:block after:size-4 after:rounded-full after:border-4 after:border-pr-main-soft after:bg-pr-bg-main"
          >
            <p className="size-full">Last read: {formatDate(new Date(Date.now()))}</p>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default BookReadPage;
