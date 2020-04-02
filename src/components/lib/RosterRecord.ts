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
  public get getDay(): number {
    return this.src.getDay();
  }
  public updateAttendanceTime(value: Date | null): void {
    this.attendanceTime =
      value === null ? null : DateUtils.calcTime(value, this.src);
    this.updateHours();
  }
  public updateLeavingTime(value: Date | null): void {
    this.leavingTime =
      value === null ? null : DateUtils.calcTime(value, this.src);
    this.updateHours();
  }

  private updateHours(): void {
    if (this.attendanceTime === null || this.leavingTime === null) {
      this.workingHours = 0;
      return;
    }
    this.start = this.attendanceTime;
    this.end = this.leavingTime;

    // 開始時間と終了時間の調整
    if (this.isBreakTime(this.start)) {
      const bt: Date[] | undefined = this.getBreakTime(this.start);
      if (bt !== undefined) {
        this.start = DateUtils.calcTime(bt[1], this.src);
      }
    }
    if (this.isBreakTime(this.end)) {
      const bt: Date[] | undefined = this.getBreakTime(this.end);
      if (bt !== undefined) {
        this.end = DateUtils.calcTime(bt[0], this.src);
      }
    }

    const hours: number = this.calcWorkingHours();

    if (this.isWorkday) {
      this.workingHours = hours;
    } else {
      this.holidayWorkingHours = hours;
    }
  }

  private isBreakTime(at: Date): boolean {
    const list: Date[][] = BreakTimeListModule.shadowList;
    return list.some(
      b =>
        DateUtils.getTimeValue(b[0]) <= DateUtils.getTimeValue(at) &&
        DateUtils.getTimeValue(b[1]) >= DateUtils.getTimeValue(at)
    );
  }

  private getBreakTime(at: Date): Date[] | undefined {
    const list: Date[][] = BreakTimeListModule.shadowList;
    return list.find(
      b =>
        DateUtils.getTimeValue(b[0]) <= DateUtils.getTimeValue(at) &&
        DateUtils.getTimeValue(b[1]) >= DateUtils.getTimeValue(at)
    );
  }

  private calcWorkingHours(): number {
    const hours: number =
      (this.end!.getTime() - this.start!.getTime()) / 60 / 60 / 1000;
    const list: Date[][] = BreakTimeListModule.shadowList;
    const totalBreakTime: number = list
      .map(b => [
        DateUtils.calcTime(b[0], this.src),
        DateUtils.calcTime(b[1], this.src)
      ])
      .filter(
        b =>
          this.start!.getTime()! < b[0].getTime() &&
          b[1].getTime() < this.end!.getTime()
      )
      .map(b => (b[1].getTime() - b[0].getTime()) / 60 / 60 / 1000)
      .reduce((previous: number, current: number) => previous + current, 0);
    return hours - totalBreakTime;
  }
}
