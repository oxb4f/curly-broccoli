import calculateAge from './calculateAge';

const prepareRequest = (data, apiAction) => {
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
    case 'uploadPhoto': {
      return new Promise((resolve) => data.canvas.toBlob(resolve)).then((imageBlob) => ({
        image: imageBlob,
        bucket: data.bucket
      }));
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

export { prepareRequest, processResponse, clearEmptyFields };
