import moment, { Moment } from 'moment';
import 'moment-timezone';
import { Language } from '../translations/languages';

export enum DateFormat {
  MonthDayYear = 'L',
  MonthDayYearHourMinutePeriod = 'L LT',
  YearMonthDay = 'YYYY-MM-DD',
  YearMonthDayHourMinutePeriod = 'YYYY-MM-DD LT',
  DayMonthYear = 'DD MMM YYYY',
  ShortMonthYear = 'MMM YYYY',
  MonthYear = 'MMMM YYYY',
  MonthDayYearHourMinute = 'MMMM Do, YYYY h:mm',
  YearShortNumericMonth = 'YYYY-MM',
  MonthDayYearTime = 'M/D/YYYY h:mm a',
  DayMonthYearTime = 'D/M/YYYY h:mm a',
  MonthDayYearWithoutSpace = 'MMDDYYYY',
  HourMinutes = 'LT',
}
export enum TimeFormat {
  Default = 'LT',
  HHmmExtended = 'hh:mm a',
  HHmmBasic = 'HHmm',
  HHmmSeparated = 'HH:mm',
}
export enum DateDiff {
  Milliseconds = 'milliseconds',
  Minutes = 'minutes',
  Months = 'months',
  Days = 'days',
}

export interface Interval {
  from: Date | string;
  to: Date | string;
}

export class DateHelper {
  static initialize(locale: string): void {
    moment.locale(locale);
  }
  static toUnixTimestamp(value?: Date | string): number {
    return moment(value).unix();
  }
  static isDate(value: unknown): value is Date {
    return (
      value instanceof Date ||
      (typeof value !== 'number' && this.isValid(value))
    );
  }
  static isValid(value: unknown): boolean {
    return moment(value as moment.MomentInput, true).isValid();
  }
  static formatDate(
    value: Date | string,
    format = DateFormat.MonthDayYear
  ): string {
    return moment(value).format(format);
  }
  static toDate(value?: string): Date {
    return moment(value).toDate();
  }
  static getDateAsString(dateToTransform?: Date): string {
    const date = dateToTransform ? dateToTransform : new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const result = `${date.getFullYear()}-${month}-${day}`;
    return result;
  }
  static getDateAsStringIgnoringTimezone(dateToTransform?: Date): string {
    let date = dateToTransform ? dateToTransform : new Date();
    date = DateHelper.compensateTimezone(date);
    return this.getDateAsString(date);
  }
  static compensateTimezone(date: Date): Date {
    const timezoneOffset = date.getTimezoneOffset();
    date.setTime(date.getTime() + timezoneOffset * 60 * 1000);
    return date;
  }
  static formatTime(
    value: string,
    format = TimeFormat.Default,
    inputFormat = TimeFormat.HHmmBasic
  ): string {
    return moment(value, inputFormat).format(format);
  }
  static compare(
    left: string | Date,
    right: string | Date,
    output = DateDiff.Milliseconds,
    precise = true
  ): number {
    const leftDate = moment(left);
    const rightDate = moment(right);
    return rightDate.diff(leftDate, output, precise);
  }
  static diffAsDays(
    left: string | Date,
    right: string | Date,
    output = DateDiff.Milliseconds,
    precise = true
  ): number {
    return moment
      .duration(DateHelper.compare(left, right, output, precise))
      .asDays();
  }
  static diffAsMinutes(left: string | Date, right: string | Date): number {
    return moment.duration(DateHelper.compare(left, right)).asMinutes();
  }
  static isSameDay(left: string | Date, right: string | Date): boolean {
    const leftDate = moment(left);
    const rightDate = moment(right);
    return rightDate.isSame(leftDate, 'day');
  }
  static isBefore(left: string | Date, right: string | Date): boolean {
    const leftDate = moment(left);
    const rightDate = moment(right);
    return leftDate.isBefore(rightDate);
  }
  static isAfter(left: string | Date, right: string | Date): boolean {
    const leftDate = moment(left);
    const rightDate = moment(right);
    return leftDate.isAfter(rightDate);
  }
  static isBetween(
    compare: string | Date,
    left?: string | Date,
    right?: string | Date
  ): boolean {
    const compareDate = moment(compare);
    const leftDate = left;
    const rightDate = right;
    return compareDate.isBetween(leftDate, rightDate, undefined, '[]');
  }
  static add(value: string | Date, amount: number, unit: DateDiff): Date {
    return moment(value).add(amount, unit).toDate();
  }
  /**
   * Iterate through a range of dates
   *
   * @param interval date the interval starts and ends (inclusive)
   * @param stepUnit months, days, etc...
   * @param step think of this as i += step
   *
   * @example
   *
   * for (const date of DateHelper.dateRange({ from, to })) {
   *   // do something with date
   * }
   */
  static *dateRange(
    { from, to }: Interval,
    stepUnit = DateDiff.Days,
    step = 1
  ): IterableIterator<Date> {
    const dateFrom = moment(from);
    const dateTo = moment(to);
    for (
      let currentDate = dateFrom;
      currentDate.isSameOrBefore(dateTo);
      currentDate = moment(currentDate).add(step, stepUnit)
    ) {
      yield moment(currentDate).toDate();
    }
  }
  static fromNow(value: Date | string): string {
    return moment(value).fromNow();
  }
  static startOfDay(
    value?: string | Date,
    format = DateFormat.MonthDayYear
  ): string {
    return moment(value).startOf('day').format(format);
  }
  static getUserTimezone(): string {
    return moment.tz.guess();
  }
  static getTimeZonesUTC(): string[] {
    const timeZonesWithUTCFormat = moment.tz.names().map((timeZone) => {
      return `${timeZone}`;
    });

    // format returned: "America/Argentina/Buenos_Aires (UTC - 03:00)"
    return timeZonesWithUTCFormat;
  }
  static getUtcOffsetInMinutes(): number {
    return moment().utcOffset();
  }

  static formatTimestampInDays(
    timestamp: number | string,
    timeZone?: string
  ): string {
    const formatString = 'DD MMM YYYY';
    if (timeZone) {
      return moment.unix(Number(timestamp)).tz(timeZone).format(formatString);
    }
    return moment.unix(Number(timestamp)).format(formatString);
  }

  static formatTimestampInHours(
    timestamp: number | string,
    timeZone?: string
  ): string {
    const formatString = 'ddd hh:mm a';
    moment.locale(localStorage.getItem('language') || Language.en);
    if (timeZone) {
      return moment.unix(Number(timestamp)).tz(timeZone).format(formatString);
    }
    return moment.unix(Number(timestamp)).format(formatString);
  }

  static getDateFromTimestampWithTimeZone(
    timestamp: number,
    timeZone?: string,
    format?: string
  ): string {
    if (timeZone) {
      return moment
        .unix(timestamp)
        .tz(timeZone)
        .format(format ?? DateFormat.DayMonthYearTime);
    }
    return moment.unix(timestamp).format(format ?? DateFormat.DayMonthYearTime);
  }

  static getDateFromTimestampWithTimeZoneWithoutTime(
    timestamp: number,
    timeZone?: string
  ): string {
    const format = 'MM/DD/YYYY';
    if (timeZone) {
      return moment.unix(timestamp).tz(timeZone).format(format);
    }
    return moment.unix(timestamp).format(format);
  }

  static getDateMoment(timestamp: number, timeZone?: string): Moment {
    if (timeZone) {
      return moment.unix(timestamp).tz(timeZone);
    }
    return moment.unix(timestamp);
  }

  static getDateFromMomentWithTimeZone(
    value: Moment,
    timeZone?: string
  ): Moment {
    if (timeZone) {
      return value.tz(timeZone);
    }
    return value;
  }

  static convertToDateObject(date: string): string {
    return moment(date).toDate().toISOString();
  }

  static convertStringToTimestamp(date: string, timeZone?: string): number {
    const format = 'DD/MM/YYYY HH:mm A';
    let momentObj;

    if (timeZone) {
      momentObj = moment.tz(date, format, timeZone).startOf('second');
    } else {
      momentObj = moment(date, format).startOf('second');
    }

    const timestamp = momentObj.valueOf() / 1000;
    return timestamp;
  }
}
