const BookReadingRecordsList = ({ list }) => {
  return (
    <ul className="relative pl-6 before:absolute before:left-1 before:top-1 before:block before:w-1 before:h-full before:bg-pr-main before:translate-x-1/2">
      {list.map((tracker, index) => (
        <li
          key={tracker.id}
          className="relative min-h-20 
					after:absolute after:-left-6 after:top-1 after:block after:size-4 after:rounded-full after:border-4 after:border-pr-main-soft after:bg-pr-bg-main"
        >
          <p className="">
            {`${!index ? 'Last read:' : 'Read:'} ${tracker.finishedDatetime}`}
            {}
          </p>
          {tracker.readingRecords && (
            <ul>
              {tracker.readingRecords.map((record) => (
                <li key={record.id} className="py-4 text-2xl">
                  {record.totalMinutesDuration}m
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookReadingRecordsList;
