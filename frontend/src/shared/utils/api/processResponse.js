import calculateAge from '../date/calculateAge';
import formatDate from '../date/formatDate';
import clearEmptyFields from '../object/clearEmptyFields';

const processResponse = (data, apiEndpoint) => {
  switch (apiEndpoint) {
    case 'users': {
      if (data.users)
        return {
          ...data,
          users: data.users.map((user) => processResponse(user, 'users'))
        };

      const getPersonalInfo = (userData) => {
        const fullName = `${userData.firstName ?? ''} ${userData.lastName ?? ''}`.trim();
        const age = calculateAge(userData.birthday);

        return {
          ...userData,
          calculated: {
            fullName: fullName || null,
            age: age ? `${age} y.o.` : null
          }
        };
      };

      const { firstName, lastName, birthday, ...rest } = data;
      const formatedBirthday = birthday?.split('T')?.[0] ?? null;
      const personalInfo = getPersonalInfo({ firstName, lastName, birthday: formatedBirthday });
      const clearedData = clearEmptyFields({ ...rest, personalInfo });

      return clearedData;
    }
    case 'books': {
      const {
        books,
        id,
        userId,
        isPrivateAdded,
        title,
        author,
        imageUrl,
        isFavorite,
        isRead,
        rating,
        review,
        ...otherInfo
      } = data;

      if (books) {
        return { ...otherInfo, books: books.map((book) => processResponse(book, 'books')) };
      }

      return {
        id,
        userId,
        imageUrl,
        isPrivateAdded,
        info: {
          title,
          author,
          other: otherInfo
        },
        stats: { isFavorite, isRead, rating, review }
      };
    }
    case 'images': {
      return {
        imageUrl: data.url
      };
    }
    case 'followers': {
      return {
        followersId: data.id,
        followed: Boolean(data.id)
      };
    }
    case 'reading-trackers': {
      if (data.trackers) {
        const dateSet = new Set();
        const formattedTrackers = [];

        for (const tracker of data.trackers) {
          const datetime = new Date(tracker.finishedAt);
          const date = `${datetime.getDate()}${datetime.getMonth()}${datetime.getFullYear()}`;
          const defaultFormat = processResponse(tracker, 'reading-trackers');

          if (dateSet.has(date)) {
            formattedTrackers.push({
              ...defaultFormat,
              finishedDatetime: formatDate(datetime, { timeStyle: 'short' })
            });
          } else {
            dateSet.add(date);
            formattedTrackers.push({
              ...defaultFormat,
              finishedDatetime: formatDate(datetime, {
                dateStyle: 'relative',
                timeStyle: 'short'
              })
            });
          }
        }

        return {
          ...data,
          trackers: formattedTrackers
        };
      }

      return {
        ...data,
        state: {
          isReading: data.state === 'reading',
          isPaused: data.state === 'paused',
          isFinished: data.state === 'finished',
          isStarted: data.state === 'reading' || data.state === 'paused'
        },
        readingRecords: data.readingRecords.map((record) => ({
          ...record,
          totalMinutesDuration: formatDate(new Date(record.duration), {
            minute: 'total'
          })
        })),
        totalDuration: data.readingRecords.reduce((result, record) => result + record.duration, 0)
      };
    }
  }
};

export default processResponse;
