const calculateAge = (birthday) => {
  if (!birthday) return;

  return Math.floor((new Date() - new Date(birthday)) / (365.25 * 24 * 60 * 60 * 1000));
};

export default calculateAge;
