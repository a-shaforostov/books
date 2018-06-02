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

export const formatDistance = dist => {
  const km = Math.floor(dist / 1000);
  const m = Math.round(dist - km * 1000);
  const parts = [];
  if (km > 0) parts.push(`${km} км `);
  if (km < 10) {
    parts.push(`${m} м`);
  } else {
    parts.unshift('~');
  }
  return parts.join('');
};

export const removeDashes = str => str.replace(/\-/g, '');
