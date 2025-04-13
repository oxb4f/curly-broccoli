const formatDate = (date, formatParameters, locale = 'uk-UA') => {
  if (formatParameters?.relative) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isToday) {
      return 'Today';
    }

    if (isYesterday) {
      return 'Yesterday';
    }
  }

  return new Intl.DateTimeFormat(locale, formatParameters).format(date);
};

export default formatDate;
