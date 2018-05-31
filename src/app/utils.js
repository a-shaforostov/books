export const timeFormatHM = (date) => {
  return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
};

export const timeFormatHMS = (date) => {
  return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}`;
};

export const isReserveActive = (time) => {
  const now = new Date();
  return time > now;
};
