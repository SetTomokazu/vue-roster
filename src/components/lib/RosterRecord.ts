import DateUtils from "./DateUtils";
import { BreakTimeListModule } from "@/store/modules/BreakTimeListModule";

export default class RosterRecord {
  /** 対象日 */
  public src: Date;
  /** 日 */
  public date: number;
  /** 曜日 */
  public day: number;
  /** 出勤時間 */
  public attendanceTime: Date | null = null;
  /** 退勤時間 */
  public leavingTime: Date | null = null;
  /** 作業開始時間 */
  public start: Date | null = null;
  /** 作業終了時間 */
  public end: Date | null = null;
  /** 実作業時間 */
  public workingHours = 0;
  /** 残業時間 */
  public overtimeHours = 0;
  /** 休出時間 */
  public holidayWorkingHours = 0;
  /** 休出残業 */
  public holidayOvertimeHours = 0;
  /** 代休時間 */
  public compensatoryDayOff = 0;
  /** 代休時間 */
  public remarks = "";
  /** 祝日 */
  public isHoliday: boolean;
  /** 平日 */
  public isWorkday: boolean;

  constructor(src: Date) {
    this.src = src;
    this.date = src.getDate();
    this.day = src.getDay();

    this.isHoliday = DateUtils.isHoliday(this.src);
    this.isWorkday = this.day !== 0 && this.day !== 6 && !this.isHoliday;
    if (this.isWorkday) {
      this.attendanceTime = new Date(this.src);
      this.attendanceTime.setHours(9);
      this.attendanceTime.setMinutes(0);
      this.attendanceTime.setSeconds(0);
      this.attendanceTime.setMilliseconds(0);

      this.leavingTime = new Date(this.src);
      this.leavingTime.setHours(18);
      this.leavingTime.setMinutes(0);
      this.leavingTime.setSeconds(0);
      this.leavingTime.setMilliseconds(0);
    }
    this.updateHours();
  }

  public get getDate(): number {
    return this.src.getDate();
  }
  public get getDay() {
    return this.src.getDay();
  }
  public updateAttendanceTime(value: Date | null) {
    this.attendanceTime = value;
    this.updateHours();
  }
  public updateLeavingTime(value: Date | null) {
    this.leavingTime = value;
    this.updateHours();
  }

  private updateHours = () => {
    console.log("updateHours");
    if (this.attendanceTime === null || this.leavingTime === null) {
      this.workingHours = 0;
    } else {
      this.start = this.attendanceTime;
      this.end = this.leavingTime;

      // 開始時間と終了時間の調整
      if (this.isBreakTime(this.start)) {
        const bt = this.getBreakTime(this.start)!;
        this.start = bt[1];
      }
      if (this.isBreakTime(this.end)) {
        const bt = this.getBreakTime(this.end)!;
        this.end = bt[0];
      }

      if (this.isWorkday) {
        this.workingHours =
          (this.leavingTime.getTime() - this.attendanceTime.getTime()) /
          60 /
          60 /
          1000;
      } else {
        this.holidayWorkingHours =
          (this.leavingTime.getTime() - this.attendanceTime.getTime()) /
          60 /
          60 /
          1000;
      }
    }
  };

  private isBreakTime(at: Date): boolean {
    const list = BreakTimeListModule.breakTimeList;
    console.log(JSON.stringify(list));
    if (list === undefined) {
      return false;
    } else {
      return list
        .filter(b => b !== null)
        .map(b => b!)
        .some(
          b =>
            DateUtils.getTimeValue(b[0]) <= DateUtils.getTimeValue(at) &&
            DateUtils.getTimeValue(b[1]) >= DateUtils.getTimeValue(at)
        );
    }
  }

  private getBreakTime(at: Date): Date[] | undefined {
    const list = BreakTimeListModule.breakTimeList;
    if (list === undefined) {
      return undefined;
    } else {
      return list
        .filter(b => b !== null)
        .map(b => b!)
        .find(
          b =>
            DateUtils.getTimeValue(b[0]) <= DateUtils.getTimeValue(at) &&
            DateUtils.getTimeValue(b[1]) >= DateUtils.getTimeValue(at)
        );
    }
  }
}
