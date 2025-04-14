import calculateAge from './calculateAge';

const prepareRequest = (data, apiEndpoint, apiAction) => {
  switch (apiEndpoint) {
    case 'users':
      switch (apiAction) {
        case 'signIn':
          return {
            username: data.username,
            password: data.password
          };
        case 'signUp':
          return {
            username: data.username,
            password: data.password
          };
        case 'changeInfo': {
          const { telegram, instagram, ...rest } = Object.fromEntries(
            Object.entries(data).map((item) => {
              if (!item[1]) item[1] = null;
              return item;
            })
          );

          return {
            ...rest,
            social: {
              telegram,
              instagram
            }
          };
        }
        default:
          return;
      }
    case 'books':
      switch (apiAction) {
        case 'create':
          return {
            title: data.title,
            author: data.author,
            numberOfPages: Number(data.numberOfPages),
            description: data.description,
            genre: data.genre,
            isbn: data.isbn,
            imageUrl: data.imageUrl
          };
        case 'edit': {
          console.log(data);

          return Object.fromEntries(
            Object.entries(data).map((item) => {
              item[1] ??= null;
              if (typeof item[1] === 'string' && !isNaN(item[1])) item[1] = Number(item[1]);

              return item;
            })
          );
        }
        default:
          return;
      }
    case 'images':
      switch (apiAction) {
        case 'upload':
          return {
            image: data.binaryImage,
            bucket: data.bucket
          };
      }
  }
};

const processResponse = (data, apiEndpoint) => {
  switch (apiEndpoint) {
    case 'users': {
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

      return {
        ...rest,
        personalInfo
      };
    }
    case 'books': {
      const { books, id, title, author, imageUrl, isFavorite, isRead, rating, review, ...other } =
        data;

      if (books) {
        return { ...other, books: books.map((book) => processResponse(book, 'books')) };
      }

      return {
        id,
        imageUrl,
        info: {
          title,
          author,
          other
        },
        stats: { isFavorite, isRead, rating, review }
      };
    }
    case 'images': {
      return {
        imageUrl: data.url
      };
    }
  }
};

const clearEmptyFields = (object) => {
  const result = {};
  for (const [key, value] of Object.entries(object)) {
    if (value === null) continue;
    else if (typeof value === 'object') result[key] = clearEmptyFields(value);
    else result[key] = value;
  }
  return result;
};

const formatKey = (key) => {
  if (typeof key !== 'string') throw new Error('Key must be string');
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
};

export { prepareRequest, processResponse, clearEmptyFields, formatKey };
