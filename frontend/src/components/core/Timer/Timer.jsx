import { useEffect, useState } from 'react';
import formatDate from '../../../utils/formatDate';

const Timer = ({
  isStarted,
  isStopped,
  initialTime = '00:00:00',
  isIncrement = true,
  formatParameters = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' },
  className = ''
}) => {
  const parseTimeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const [seconds, setSeconds] = useState(parseTimeToSeconds(initialTime));

  useEffect(() => {
    if (!isStarted) return;

    const timer = setInterval(() => {
      setSeconds((prev) => (isIncrement ? prev + 1 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isIncrement]);

  useEffect(() => {
    if (isStopped) {
      setSeconds(parseTimeToSeconds(initialTime));
    }
  }, [initialTime, isStopped]);

  return <div className={className}>{formatDate(new Date(seconds * 1000), formatParameters)}</div>;
};

export default Timer;
