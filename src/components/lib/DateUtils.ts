import * as holidayJp from "@holiday-jp/holiday_jp";
import moment from "moment";
export default class DateUtils {
  public static getFirstDay(src: Date): Date {
    return new Date(src.getFullYear(), src.getMonth(), 1);
  }

  public static getLastDay(src: Date): Date {
    const nextMonth = new Date(src);
    nextMonth.setMonth(src.getMonth() + 1);
    nextMonth.setDate(0);
    return nextMonth;
  }
  public static getDaysOfMonth(src: Date): Date[] {
    const result: Date[] = [];
    const firstDay = this.getFirstDay(src);
    const lastDay = this.getLastDay(src);

    for (let d = firstDay.getDate(); d <= lastDay.getDate(); d++) {
      result.push(new Date(src.getFullYear(), src.getMonth(), d));
    }
    return result;
  }
  private static weeks: string[] = ["日", "月", "火", "水", "木", "金", "土"];
  public static getWeek(src: number): string {
    return this.weeks[src];
  }

  public static isHoliday(target: Date) {
    return holidayJp.isHoliday(target);
  }

  public static getTimeValue(at: Date): number {
    return Number(moment(at).format("HHmm"));
  }
}
