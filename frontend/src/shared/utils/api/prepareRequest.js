const prepareRequest = (data, apiEndpoint, apiAction) => {
  switch (apiEndpoint) {
    case 'users':
      switch (apiAction) {
        case 'getAll': {
          return {
            params: {
              limit: data.limit,
              offset: data.offset,
              orderField: data.orderField,
              orderDirection: data.orderDirection
            }
          };
        }
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
            ...((telegram === undefined && instagram === undefined) || {
              social: {
                telegram,
                instagram
              }
            })
          };
        }
        default:
          return;
      }
    case 'followers':
      switch (apiAction) {
        case 'get':
          return {
            params: {
              userId: data.userId,
              limit: data.limit,
              offset: data.offset,
              orderDirection: data.orderDirection
            }
          };
        case 'get-count':
          return {
            params: {
              userId: data
            }
          };
        case 'follow':
          return {
            userId: data
          };
        case 'unfollow':
          return {
            params: {
              id: data
            }
          };
        default:
          return;
      }
    case 'events':
      switch (apiAction) {
        case 'get':
          return {
            params: {
              orderField: data.orderField,
              orderDirection: data.orderDirection,
              limit: data.limit,
              offset: data.offset
            }
          };
        default:
          return;
      }
    case 'books':
      switch (apiAction) {
        case 'get':
          return { params: data };
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

export default prepareRequest;
