import { Moment } from "moment";

export class CalendarDay {
    public numberDay: number;
    public fulDate: Moment | null;
    public isDayToday: boolean;
    public isDayThisMonth: boolean;
    public isDayThisYear: boolean;

    constructor() {
        this.numberDay = 0;
        this.fulDate = null;
        this.isDayToday = false;
        this.isDayThisMonth = false;
        this.isDayThisYear = false;
    }
}

export class CalendarDayPicker extends CalendarDay {
    public isOutOfMaxMin: boolean;
    public isIncludeRage: boolean;
    public isIncludeTempoRage: boolean;
    public isSelected: boolean;

    constructor() {
        super();
        this.isSelected = false;
        this.isOutOfMaxMin = false;
        this.isIncludeRage = false;
        this.isIncludeTempoRage = false;
    }
}
