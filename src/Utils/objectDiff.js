/**
 *  Compares object with base.
 *  @param {object} base Base object to compare with
 *  @param {object} obj Object which is compared
 *  @returns {object} Changes object from base
 */
function diff(base, obj) {
  let res = {};
  for(let key in obj) {
    // TODO: Add deep comparsion
    if(!(key in base) || base[key] != obj[key]) {
      res[key] = obj[key];
    }
  }

  return res;
}

export default diff;
