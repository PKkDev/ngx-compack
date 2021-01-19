import { CalendarDay, CalendarDayPicker } from "./calendar-day";

export class Calendar {
  public week: CalendarDay[];

  constructor() {
    this.week = [];
  }
}

export class CalendarPicker {
  public week: CalendarDayPicker[];

  constructor() {
    this.week = [];
  }
}
