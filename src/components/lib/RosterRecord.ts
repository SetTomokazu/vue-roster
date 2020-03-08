import DateUtils from "./DateUtils";

export default class RosterRecord {
  /** 対象日 */
  public src: Date;
  /** 日 */
  public date: number;
  /** 曜日 */
  public day: number;
  /** 出勤時間 */
  public start: Date | null = null;
  /** 退社時間 */
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
      this.start = new Date(this.src);
      this.start.setHours(9);
      this.start.setMinutes(0);
      this.start.setSeconds(0);
      this.start.setMilliseconds(0);

      this.end = new Date(this.src);
      this.end.setHours(18);
      this.end.setMinutes(0);
      this.end.setSeconds(0);
      this.end.setMilliseconds(0);
    }
    this.updateHours();
  }

  public get getDate(): number {
    return this.src.getDate();
  }
  public get getDay() {
    return this.src.getDay();
  }
  public calcHours = (event: Date) => {
    this.updateHours();
  };

  private updateHours = () => {
    if (this.start === null || this.end === null) {
      this.workingHours = 0;
    } else {
      if (this.isWorkday) {
        this.workingHours =
          (this.end.getTime() - this.start.getTime()) / 60 / 60 / 1000;
      } else {
        this.holidayWorkingHours =
          (this.end.getTime() - this.start.getTime()) / 60 / 60 / 1000;
      }
    }
  };
}
