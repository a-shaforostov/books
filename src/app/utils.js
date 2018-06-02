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

export const removeDashes = str => str.replace(/-/g, '');

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
  for (let i = 0; i <= a.length - b.length; i++) {
    const m = indistinctMatching(3, a.toLowerCase().substr(i, b.length), b.toLowerCase());
    if (m > 70)
      return true;
  }
 return false;
};
