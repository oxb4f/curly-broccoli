import calculateAge from '../date/calculateAge';
import formatDate from '../date/formatDate';
import clearEmptyFields from '../object/clearEmptyFields';

const processResponse = (responseData, apiEndpoint) => {
  switch (apiEndpoint) {
    case 'users': {
      if (responseData.users)
        return {
          ...responseData,
          users: responseData.users.map((user) => processResponse(user, 'users'))
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

      const {
        firstName,
        lastName,
        birthday,
        numberOfFollowers,
        numberOfFollowing,
        numberOfReadBooks,
        ...rest
      } = responseData;
      const formatedBirthday = birthday?.split('T')?.[0] ?? null;
      const personalInfo = getPersonalInfo({ firstName, lastName, birthday: formatedBirthday });
      const clearedData = clearEmptyFields({
        ...rest,
        personalInfo,
        stats: {
          followersCount: numberOfFollowers,
          followingCount: numberOfFollowing,
          readBooksCount: numberOfReadBooks
        }
      });

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
      } = responseData;

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
        imageUrl: responseData.url
      };
    }
    case 'followers': {
      const { data, id, result, followersCount, followingCount, ...rest } = responseData;

      if (data) {
        return {
          followers: data.map((item) => processResponse(item.follower, 'users')),
          following: data.map((item) => processResponse(item.user, 'users')),
          ...rest
        };
      }

      if (id || result) {
        return {
          followersId: id,
          followed: Boolean(id)
        };
      }

      return {
        followersCount,
        followingCount
      };
    }
    case 'events': {
      const { data, ...rest } = responseData;

      return {
        ...rest,
        events: data.map(({ id, name, createdAt, fromUser, payload, ...rest }) => {
          switch (name) {
            case 'user_books.add': {
              const { userBookId, profile } = payload;
              return {
                eventDetails: { id, createdAt, type: 'book', action: 'add' },
                addedBook: { ...profile, id: userBookId },
                fromUser: processResponse(fromUser, 'users')
              };
            }
            case 'followers.create': {
              return {
                eventDetails: { id, createdAt, type: 'user', action: 'follow' },
                followedUser: processResponse(payload.user, 'users'),
                fromUser: processResponse(fromUser, 'users')
              };
            }
            default:
              return { payload, fromUser, createdAt, name, ...rest };
          }
        })
      };
    }
    case 'reading-trackers': {
      if (responseData.trackers) {
        const dateSet = new Set();
        const formattedTrackers = [];

        for (const tracker of responseData.trackers) {
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
          ...responseData,
          trackers: formattedTrackers
        };
      }

      return {
        ...responseData,
        state: {
          isReading: responseData.state === 'reading',
          isPaused: responseData.state === 'paused',
          isFinished: responseData.state === 'finished',
          isStarted: responseData.state === 'reading' || responseData.state === 'paused'
        },
        readingRecords: responseData.readingRecords.map((record) => ({
          ...record,
          totalMinutesDuration: formatDate(new Date(record.duration), {
            minute: 'total'
          })
        })),
        totalDuration: responseData.readingRecords.reduce(
          (result, record) => result + record.duration,
          0
        )
      };
    }
  }
};

export default processResponse;
