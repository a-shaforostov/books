/**
 * @module utils
 */

/**
 * format time without seconds
 * @param date
 * @returns {string}
 */
export const timeFormatHM = date => {
  if (!(date instanceof Date)) return '';
  return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
};

/**
 * format time with seconds
 * @param date
 * @returns {string}
 */
export const timeFormatHMS = date => {
  if (!(date instanceof Date)) return '';
  return [
    `${String(date.getHours()).padStart(2,'0')}`,
    `${String(date.getMinutes()).padStart(2,'0')}`,
    `${String(date.getSeconds()).padStart(2,'0')}`,
  ].join(':');
};

/**
 * Checks if reservation is active
 * @param {Date} time
 * @returns {boolean}
 */
export const isReserveActive = time => {
  if (!(time instanceof Date)) return false;
  const now = new Date();
  return time > now;
};

/**
 * Format distance as strings of kilometers and meters
 * @param dist
 * @returns {string}
 */
export const formatDistance = dist => {
  if (!Number.isFinite(dist)) return '';
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

/**
 * Remove dashes from ISBN string
 * @param str
 * @returns {string}
 */
export const removeDashes = str => {
  if (!(typeof str === 'string') && !Number.isFinite(str)) return '';
  return String(str).replace(/-/g, '');
};

/**
 * Match parts of strings
 * @param strInputA - string 1
 * @param strInputB - string 2
 * @param lngLen - length of partials
 * @returns {{lngCountLike: number, lngSubRows: number}} - stats of equalities
 */
const matching = (strInputA, strInputB, lngLen) => {
  const strA = strInputA;
  const strB = strInputB;

  const tempRet = {
    lngCountLike: 0,
    lngSubRows: 0,
  };

  for (let posStrA = 0; posStrA <= strA.length - lngLen; posStrA++) {
    const strTempA = strA.substr(posStrA, lngLen);

    for (let posStrB = 0; posStrB <= strB.length - lngLen; posStrB++) {
      const strTempB = strB.substr(posStrB, lngLen);
      if (strTempA === strTempB) {
        tempRet.lngCountLike++;
        break;
      }
    }
    tempRet.lngSubRows++;
  }

  return tempRet;
};

/**
 * Approximate matching
 * @param maxMatching - max length of parts
 * @param strInputMatching - string
 * @param strInputStandart - template
 * @returns {number} - percentage of match
 */
const indistinctMatching = (maxMatching, strInputMatching, strInputStandart) => {
  if (!(maxMatching && strInputMatching && strInputStandart)) {
    return 0;
  }

  let gret = {
    lngCountLike: 0,
    lngSubRows: 0,
  };

  for (let lngCurLen = 0; lngCurLen <= maxMatching; lngCurLen++) {
    let tret = matching(strInputMatching, strInputStandart, lngCurLen);
    gret.lngCountLike += tret.lngCountLike;
    gret.lngSubRows += tret.lngSubRows;

    tret = matching(strInputStandart, strInputMatching, lngCurLen);
    gret.lngCountLike += tret.lngCountLike;
    gret.lngSubRows += tret.lngSubRows;
  }

  if (gret.lngSubRows === 0) {
    return 0;
  }

  return Math.trunc((gret.lngCountLike / gret.lngSubRows) * 100);
};

/**
 * Compares two string approximately. Returns true if matched 80%. Parts by 4 chars
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export const isApproxEqual = (a, b) => {
  if (!(typeof a === 'string') || !(typeof b === 'string')) return false;
  for (let i = 0; i <= a.length - b.length; i++) {
    const m = indistinctMatching(3, a.toLowerCase().substr(i, b.length), b.toLowerCase());
    if (m > 70)
      return true;
  }
 return false;
};
