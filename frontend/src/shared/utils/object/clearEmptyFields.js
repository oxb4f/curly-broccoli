const clearEmptyFields = (object) => {
  const result = {};
  for (const [key, value] of Object.entries(object)) {
    if (value === null) continue;
    else if (typeof value === 'object') result[key] = clearEmptyFields(value);
    else result[key] = value;
  }
  return result;
};

export default clearEmptyFields;
