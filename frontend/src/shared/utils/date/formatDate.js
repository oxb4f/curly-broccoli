const formatDate = (date, formatParameters, locale = 'uk-UA') => {
  if (formatParameters?.dateStyle === 'relative') {
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

    const time = formatParameters.timeStyle
      ? new Intl.DateTimeFormat(locale, {
          timeStyle: formatParameters.timeStyle
        }).format(date)
      : '';

    if (isToday) {
      return `Today ${time}`;
    }

    if (isYesterday) {
      return `Yesterday ${time}`;
    }

    formatParameters.dateStyle = 'medium';
  }

  if (formatParameters?.minute === 'total') {
    const totalMilliseconds = date.getTime();
    const totalMinutes = Math.round(totalMilliseconds / (1000 * 60));

    if (totalMinutes < 1) return '<1';

    return totalMinutes;
  }

  return new Intl.DateTimeFormat(locale, formatParameters).format(date);
};

export default formatDate;
