export default class RosterRecord {
  public src: Date;
  public date: number;
  public day: number;
  public start: Date | null = null;
  public end: Date | null = null;
  public workingHours = 0;
  public overtimeHours = 0;

  constructor(src: Date) {
    this.src = src;
    this.date = src.getDate();
    this.day = src.getDay();
  }

  public get getDate(): number {
    return this.src.getDate();
  }
  public get getDay() {
    return this.src.getDay();
  }
}
