import * as holidayJp from '@holiday-jp/holiday_jp'
import moment from 'moment'
export default class DateUtils {
  public static getFirstDay(src: Date): Date {
    return new Date(src.getFullYear(), src.getMonth(), 1)
  }

  public static getLastDay(src: Date): Date {
    const nextMonth: Date = new Date(src)
    nextMonth.setDate(1)
    nextMonth.setMonth(src.getMonth() + 1)
    nextMonth.setDate(0)
    return nextMonth
  }
  public static getDaysOfMonth(src: Date): Date[] {
    const result: Date[] = []
    const firstDay: Date = this.getFirstDay(src)
    const lastDay: Date = this.getLastDay(src)

    for (let d: number = firstDay.getDate(); d <= lastDay.getDate(); d++) {
      result.push(new Date(src.getFullYear(), src.getMonth(), d))
    }
    return result
  }
  private static weeks: string[] = ['日', '月', '火', '水', '木', '金', '土']
  public static getWeek(src: number): string {
    return this.weeks[src]
  }

  public static isHoliday(target: Date): boolean {
    return holidayJp.isHoliday(target)
  }

  public static getTimeValue(at: Date): number {
    return Number(moment(at).format('HHmm'))
  }

  public static calcTime(at: Date, targetDate: Date): Date {
    return this.adjustMidnight(this.removeUnderSecond(at, targetDate))
  }

  /** 深夜残業の場合、翌日換算 */
  public static adjustMidnight(at: Date): Date {
    if (0 <= at.getHours() && at.getHours() <= 5) {
      return moment(at)
        .add(1, 'day')
        .toDate()
    } else {
      return at
    }
  }

  /** 指定日の時刻に修正し、秒以下を破棄 */
  public static removeUnderSecond(
    at: Date,
    targetDate: Date = new Date()
  ): Date {
    return moment(targetDate)
      .hours(at.getHours())
      .minutes(at.getMinutes())
      .second(0)
      .millisecond(0)
      .toDate()
  }

  /** 時刻の上限、下限を設定 */
  public static removeUnderSecondOfRange(
    range: Date[],
    targetDate: Date = new Date()
  ): Date[] {
    return range.map(r => this.removeUnderSecond(targetDate, r))
  }
}
