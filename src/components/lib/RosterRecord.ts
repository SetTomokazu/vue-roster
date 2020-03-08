export default class RosterRecord {
  public src: Date;
  public date: number;
  public day: number;
  public start: Date;
  public end: Date;
  public workingHours = 0;
  public overtimeHours = 0;

  constructor(src: Date) {
    this.src = src;
    this.date = src.getDate();
    this.day = src.getDay();

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

  public get getDate(): number {
    return this.src.getDate();
  }
  public get getDay() {
    return this.src.getDay();
  }
  public calcHours(event: Date) {
    console.log(JSON.stringify(event));
  }
}
