const formatKey = (key) => {
  if (typeof key !== 'string') throw new Error('Key must be string');
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
};

export default formatKey;
