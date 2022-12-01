import { Injectable } from '@angular/core';

export type tplotOptions = {
  [key: string]: () => {}
}

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  private token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
  private timezone = /\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;
  private timezoneClip = /[^-+\dA-Z]/g;

  constructor() { }

  public dateFormat(date: any, mask: string): string {

    const utc = false;
    const gmt = false;

    const _ = () => (utc ? "getUTC" : "get");
    const d = () => date[_() + "Date"]();
    const D = () => date[_() + "Day"]();
    const m = () => date[_() + "Month"]();
    const y = () => date[_() + "FullYear"]();
    const H = () => date[_() + "Hours"]();
    const M = () => date[_() + "Minutes"]();
    const s = () => date[_() + "Seconds"]();
    const L = () => date[_() + "Milliseconds"]();
    const o = () => (utc ? 0 : date.getTimezoneOffset());
    const W = () => this.getWeek(date);
    const N = () => this.getDayOfWeek(date);

    const flags: tplotOptions = {
      d: () => d(),
      dd: () => this.pad(d()),
      ddd: () => this.i18n.dayNames[D()],
      // DDD: () => this.getDayName({
      //   y: y(),
      //   m: m(),
      //   d: d(),
      //   _: _(),
      //   dayName: this.i18n.dayNames[D()],
      //   short: true
      // }),
      dddd: () => this.i18n.dayNames[D() + 7],
      // DDDD: () => this.getDayName({
      //   y: y(),
      //   m: m(),
      //   d: d(),
      //   _: _(),
      //   dayName: this.i18n.dayNames[D() + 7]
      // }),
      m: () => m() + 1,
      mm: () => this.pad(m() + 1),
      mmm: () => this.i18n.monthNames[m()],
      mmmm: () => this.i18n.monthNames[m() + 12],
      yy: () => String(y()).slice(2),
      yyyy: () => this.pad(y(), 4),
      h: () => H() % 12 || 12,
      hh: () => this.pad(H() % 12 || 12),
      H: () => H(),
      HH: () => this.pad(H()),
      M: () => M(),
      MM: () => this.pad(M()),
      s: () => s(),
      ss: () => this.pad(s()),
      l: () => this.pad(L(), 3),
      L: () => this.pad(Math.floor(L() / 10)),
      t: () =>
        H() < 12
          ? this.i18n.timeNames[0]
          : this.i18n.timeNames[1],
      tt: () =>
        H() < 12
          ? this.i18n.timeNames[2]
          : this.i18n.timeNames[3],
      T: () =>
        H() < 12
          ? this.i18n.timeNames[4]
          : this.i18n.timeNames[5],
      TT: () =>
        H() < 12
          ? this.i18n.timeNames[6]
          : this.i18n.timeNames[7],
      // Z: () =>
      //   gmt
      //     ? "GMT"
      //     : utc
      //       ? "UTC"
      //       : this.formatTimezone(date),
      o: () =>
        (o() > 0 ? "-" : "+") +
        this.pad(Math.floor(Math.abs(o()) / 60) * 100 + (Math.abs(o()) % 60), 4),
      p: () =>
        (o() > 0 ? "-" : "+") +
        this.pad(Math.floor(Math.abs(o()) / 60), 2) +
        ":" +
        this.pad(Math.floor(Math.abs(o()) % 60), 2),
      // S: () => {
      //   const locald = date.getDate();
      //   return ["th", "st", "nd", "rd"][d() % 10 > 3 ? 0 : (((locald % 100) - (locald % 10) != 10) * d()) % 10]
      // },
      W: () => W(),
      WW: () => this.pad(W()),
      N: () => N(),
    };

    var res = mask.replace(this.token, (match: any) => {
      if (match in flags) {
        var inm = flags[match as keyof typeof flags]()
        return inm;
      }
      var ninm = match.slice(1, match.length - 1);
      return ninm;
    });

    return res;

  }

  // Internationalization strings
  private i18n = {
    dayNames: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
  };

  private pad(val: any, len: number = 2): string { return String(val).padStart(len, '0'); }

  // private getDayName({ y, m, d, _, dayName, short = false }) {
  //   const today = new Date();
  //   const yesterday = new Date();
  //   yesterday.setDate(yesterday[_ + 'Date']() - 1);
  //   const tomorrow = new Date();
  //   tomorrow.setDate(tomorrow[_ + 'Date']() + 1);
  //   const today_d = () => today[_ + 'Date']();
  //   const today_m = () => today[_ + 'Month']();
  //   const today_y = () => today[_ + 'FullYear']();
  //   const yesterday_d = () => yesterday[_ + 'Date']();
  //   const yesterday_m = () => yesterday[_ + 'Month']();
  //   const yesterday_y = () => yesterday[_ + 'FullYear']();
  //   const tomorrow_d = () => tomorrow[_ + 'Date']();
  //   const tomorrow_m = () => tomorrow[_ + 'Month']();
  //   const tomorrow_y = () => tomorrow[_ + 'FullYear']();

  //   if (today_y() === y && today_m() === m && today_d() === d) {
  //     return short ? 'Tdy' : 'Today';
  //   }
  //   else if (yesterday_y() === y && yesterday_m() === m && yesterday_d() === d) {
  //     return short ? 'Ysd' : 'Yesterday';
  //   }
  //   else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) {
  //     return short ? 'Tmw' : 'Tomorrow';
  //   }
  //   return dayName;
  // };

  private getWeek(date: any) {
    // Remove time components of date
    const targetThursday = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // Change date to Thursday same week
    targetThursday.setDate(
      targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3
    );

    // Take January 4th as it is always in week 1 (see ISO 8601)
    const firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

    // Change date to Thursday same week
    firstThursday.setDate(
      firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3
    );

    // Check if daylight-saving-time-switch occurred and correct for it
    const ds =
      targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
    targetThursday.setHours(targetThursday.getHours() - ds);

    // Number of weeks between target Thursday and first Thursday
    const weekDiff = (targetThursday.getTime() - firstThursday.getTime()) / (86400000 * 7);
    return 1 + Math.floor(weekDiff);
  };

  private getDayOfWeek(date: any) {
    let dow = date.getDay();
    if (dow === 0) {
      dow = 7;
    }
    return dow;
  };

  // private formatTimezone(date: any) {
  //   return (String(date).match(timezone) || [""])
  //     .pop()
  //     .replace(timezoneClip, "")
  //     .replace(/GMT\+0000/g, "UTC");
  // };

}
