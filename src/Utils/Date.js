function leadingZeros(x) {
  return (x < 10) ? ('0' + x) : x;
}

class CDate {
  constructor(dt) {
    this._dateTime = dt;
  }

  asDate() {
    if(this._dateTime instanceof Date) return this._dateTime;
    return this.asDottedDate();
  }

  asDottedDate() {
    const [day, month, year] = this._dateTime.split(".");
    return new Date(year, month - 1, day);
  }

  asDottedString() {
    const dt = this.asDate();
    return `${leadingZeros(dt.getDate())}.${leadingZeros(dt.getMonth() + 1)}.${dt.getFullYear()}`;
  }
}

export { CDate };
