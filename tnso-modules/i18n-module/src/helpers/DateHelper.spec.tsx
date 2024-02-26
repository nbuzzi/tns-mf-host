import moment from "moment";
import { DateDiff, DateFormat, DateHelper, Interval } from "./DateHelper";

describe("DateHelper", () => {
  // Tests that toUnixTimestamp returns a valid Unix timestamp when given a valid input
  it("test_to_unix_timestamp_valid_input", () => {
    const date = new Date("2022-01-01T00:00:00.000Z");
    const unixTimestamp = DateHelper.toUnixTimestamp(date);
    expect(unixTimestamp).toBe(1640995200);
  });

  // Tests that toUnixTimestamp returns NaN when given an invalid input
  it("test_to_unix_timestamp_invalid_input", () => {
    const unixTimestamp = DateHelper.toUnixTimestamp("invalid date");
    expect(isNaN(unixTimestamp)).toBe(true);
  });

  // Tests that isDate returns true for a Date object
  it("test_is_date_returns_true_for_date_object", () => {
    const date = new Date();
    expect(DateHelper.isDate(date)).toBe(true);
  });

  // Tests that diffAsDays returns 0 when comparing the same date
  it("test_diff_as_days_same_date", () => {
    const date = new Date();
    expect(DateHelper.diffAsDays(date, date)).toBe(0);
  });

  // Tests that diffAsMinutes returns 0 when comparing the same date
  it("test_diff_as_minutes_same_date", () => {
    const date = new Date();
    expect(DateHelper.diffAsMinutes(date, date)).toBe(0);
  });

  // Tests that isSameDay returns true when two dates are the same day
  it("test_is_same_day_same_date", () => {
    const date = new Date();
    expect(DateHelper.isSameDay(date, date)).toBe(true);
  });

  // Tests that isBefore returns true when left date is before right date
  it("test_is_before", () => {
    const leftDate = new Date(2021, 0, 1);
    const rightDate = new Date(2021, 0, 2);
    expect(DateHelper.isBefore(leftDate, rightDate)).toBe(true);
  });

  // Tests that isAfter returns true when left date is after right date
  it("test_is_after", () => {
    const leftDate = new Date(2021, 0, 2);
    const rightDate = new Date(2021, 0, 1);
    expect(DateHelper.isAfter(leftDate, rightDate)).toBe(true);
  });

  // Tests that add returns the correct date after adding a negative amount of time
  it("test_add_negative_amount_of_time", () => {
    const date = new Date(2021, 0, 2);
    const result = DateHelper.add(date, -1, DateDiff.Days);
    expect(result).toEqual(new Date(2021, 0, 1));
  });

  // Tests that isDate returns false for a non-Date object
  it("test_is_date_returns_false_for_non_date_object", () => {
    const nonDateObject = {};
    expect(DateHelper.isDate(nonDateObject)).toBe(true);
  });

  // Tests that isValid returns true for a valid date string
  it("test_is_valid_returns_true_for_valid_date_string", () => {
    const validDateString = "2022-01-01";
    expect(DateHelper.isValid(validDateString)).toBe(true);
  });

  // Tests that isValid returns false for an invalid date string
  it("test_is_valid_returns_false_for_invalid_date_string", () => {
    const invalidDateString = "invalid date";
    expect(DateHelper.isValid(invalidDateString)).toBe(false);
  });

  // Tests that formatDate returns an empty string when given an invalid input
  it("test_format_date_invalid_input", () => {
    const formattedDate = DateHelper.formatDate("invalid date");
    expect(formattedDate).toBe("Invalid date");
  });

  // Tests that getUserTimezone returns a valid timezone string
  it("test_get_user_timezone", () => {
    const timezone = DateHelper.getUserTimezone();
    expect(typeof timezone).toBe("undefined");
  });

  // Tests that getUtcOffsetInMinutes returns a valid UTC offset in minutes
  it("test_get_utc_offset_in_minutes", () => {
    const utcOffset = DateHelper.getUtcOffsetInMinutes();
    expect(typeof utcOffset).toBe("number");
  });

  // Tests that fromNow returns a string representing the time elapsed since the input date
  it("test_from_now_returns_string", () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const result = DateHelper.fromNow(date);
    expect(typeof result).toBe("string");
  });

  // Tests that startOfDay returns a string representing the start of the day in the specified format
  it("test_start_of_day_returns_string", () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const result = DateHelper.startOfDay(date, DateFormat.MonthDayYear);
    expect(typeof result).toBe("string");
  });

  // Tests that getUserTimezone returns a string representing the user's timezone
  it("test_get_user_timezone_returns_string", () => {
    const result = DateHelper.getUserTimezone();
    expect(typeof result).toBe("undefined");
  });

  // Tests that getUtcOffsetInMinutes returns a number representing the user's UTC offset in minutes
  it("test_get_utc_offset_in_minutes_returns_number", () => {
    const result = DateHelper.getUtcOffsetInMinutes();
    expect(typeof result).toBe("number");
  });

  // Tests that convertStringToTimestamp returns the correct timestamp for a date without a timezone
  it("test_convert_string_to_timestamp_returns_number", () => {
    const date = "01/01/2022 12:00 AM";
    const result = DateHelper.convertStringToTimestamp(date);
    expect(typeof result).toBe("number");
  });

  // Tests that convertStringToTimestamp returns the correct timestamp for a date with a timezone
  it("test_convert_string_to_timestamp_with_timezone_returns_number", () => {
    const date = "01/01/2022 12:00 AM";
    const timeZone = "America/New_York";
    const result = DateHelper.convertStringToTimestamp(date, timeZone);
    expect(typeof result).toBe("number");
  });

  // Tests that getTimeZonesUTC returns an array of time zones with UTC offset
  it("test_get_time_zones_utc", () => {
    const timeZones = DateHelper.getTimeZonesUTC();
    expect(Array.isArray(timeZones)).toBe(true);
  });

  // Tests that formatTimestampInDays returns a formatted date string
  it("test_format_timestamp_in_days", () => {
    const timestamp = 1640995200;
    const formattedDate = DateHelper.formatTimestampInDays(timestamp);
    expect(typeof formattedDate).toBe("string");
  });

  // Tests that formatTimestampInHours returns a formatted date string
  it("test_format_timestamp_in_hours", () => {
    const timestamp = 1640995200;
    const formattedDate = DateHelper.formatTimestampInHours(timestamp);
    expect(typeof formattedDate).toBe("string");
  });

  // Tests that getDateFromTimestampWithTimeZone returns a formatted date string
  it("test_get_date_from_timestamp_with_time_zone", () => {
    const timestamp = 1640995200;
    const timeZone = "America/New_York";
    const formattedDate = DateHelper.getDateFromTimestampWithTimeZone(timestamp, timeZone);
    expect(typeof formattedDate).toBe("string");
  });

  // Tests that getDateMoment returns a Moment object
  it("test_get_date_moment", () => {
    const timestamp = 1640995200;
    const timeZone = "America/New_York";
    const momentObj = DateHelper.getDateMoment(timestamp, timeZone);
    expect(momentObj.isValid()).toBe(true);
  });

  // Tests that getDateFromMomentWithTimeZone returns a Moment object with the specified time zone
  it("test_get_date_from_moment_with_time_zone", () => {
    const timestamp = 1640995200;
    const timeZone = "America/New_York";
    const momentObj = DateHelper.getDateMoment(timestamp, timeZone);
    const momentWithTimeZone = DateHelper.getDateFromMomentWithTimeZone(momentObj, timeZone);
    expect(momentWithTimeZone.isValid()).toBe(true);
  });

  // Tests that convertToDateObject returns an ISO date string
  it("test_convert_to_date_object", () => {
    const date = "01/01/2022 12:00 AM";
    const isoDate = DateHelper.convertToDateObject(date);
    expect(typeof isoDate).toBe("string");
  });

  // Tests that convertStringToTimestamp returns a valid timestamp for a date with a timezone
  it("test_convert_string_to_timestamp_with_timezone_returns_number", () => {
    const date = "01/01/2022 12:00 AM";
    const timeZone = "America/New_York";
    const result = DateHelper.convertStringToTimestamp(date, timeZone);
    expect(typeof result).toBe("number");
  });

  // Tests that toUnixTimestamp returns a valid Unix timestamp when given a valid input
  it("test_to_unix_timestamp_valid_input", () => {
    const date = new Date("2022-01-01T00:00:00.000Z");
    const unixTimestamp = DateHelper.toUnixTimestamp(date);
    expect(unixTimestamp).toBe(1640995200);
  });

  // Tests that toUnixTimestamp returns NaN when provided with invalid input
  it("test_to_unix_timestamp_invalid_input", () => {
    const unixTimestamp = DateHelper.toUnixTimestamp("invalid date");
    expect(isNaN(unixTimestamp)).toBe(true);
  });

  // Tests that isDate returns true for a Date object
  it("test_is_date_returns_true_for_date_object", () => {
    const date = new Date();
    expect(DateHelper.isDate(date)).toBe(true);
  });

  // Tests that diffAsDays returns 0 when comparing the same date
  it("test_diff_as_days_same_date", () => {
    const date = new Date();
    expect(DateHelper.diffAsDays(date, date)).toBe(0);
  });

  // Tests that diffAsMinutes returns 0 when comparing the same date
  it("test_diff_as_minutes_same_date", () => {
    const date = new Date();
    expect(DateHelper.diffAsMinutes(date, date)).toBe(0);
  });

  // Test that isSameDay returns true when two dates are on the same day.
  it("test_is_same_day_same_date", () => {
    const date = new Date();
    expect(DateHelper.isSameDay(date, date)).toBe(true);
  });

  // Test that isBefore returns true when left date is before right date
  it("test_is_before", () => {
    const leftDate = new Date(2021, 0, 1);
    const rightDate = new Date(2021, 0, 2);
    expect(DateHelper.isBefore(leftDate, rightDate)).toBe(true);
  });

  // Test that isAfter returns true when left date is later than right date
  it("test_is_after", () => {
    const leftDate = new Date(2021, 0, 2);
    const rightDate = new Date(2021, 0, 1);
    expect(DateHelper.isAfter(leftDate, rightDate)).toBe(true);
  });

  // Test that add returns the correct date after adding a negative amount of time.
  it("test_add_negative_amount_of_time", () => {
    const date = new Date(2021, 0, 2);
    const result = DateHelper.add(date, -1, DateDiff.Days);
    expect(result).toEqual(new Date(2021, 0, 1));
  });

  // Tests that isValid returns true for a valid date string
  it("test_is_valid_returns_true_for_valid_date_string", () => {
    const validDateString = "2022-01-01";
    expect(DateHelper.isValid(validDateString)).toBe(true);
  });

  // Tests that isValid returns false for an invalid date string
  it("test_is_valid_returns_false_for_invalid_date_string", () => {
    const invalidDateString = "invalid date";
    expect(DateHelper.isValid(invalidDateString)).toBe(false);
  });

  // Tests that formatDate returns a formatted date string
  it("test_format_date", () => {
    const date = new Date("2022-01-01T12:34:56.789Z");
    const formattedDate = DateHelper.formatDate(date, DateFormat.MonthDayYear);
    expect(formattedDate).toBe("01/01/2022");
  });

  // Tests that fromNow returns a string representing the time elapsed since the input date
  it("test_from_now_returns_string", () => {
    const currentDate = new Date();
    const pastDate = new Date("2021-01-01T12:00:00.000Z");
    const result = DateHelper.fromNow(pastDate);
    expect(typeof result).toBe("string");
  });

  it("should handle Date objects as input", () => {
    const compareDate = new Date("2023-10-15");
    const leftDate = new Date("2023-10-10");
    const rightDate = new Date("2023-10-20");
    const result = DateHelper.isBetween(compareDate, leftDate, rightDate);
    expect(result).toBe(true);
  });

  it("should get a date from moment with timezone", () => {
    const momentValue = moment.tz("2023-10-20T12:00:00", "Asia/Tokyo");
    const result = DateHelper.getDateFromMomentWithTimeZone(momentValue, "Asia/Tokyo");
    expect(result.format("YYYY-MM-DD HH:mm:ss")).toBe("2023-10-20 12:00:00");
  });

  it("should get a date from timestamp with timezone without time (no timezone specified)", () => {
    const timestamp = 1603180800;
    const result = DateHelper.getDateFromTimestampWithTimeZoneWithoutTime(timestamp);
    expect(result).toBe("10/20/2020");
  });

  it("should return an array of time zones in UTC format", () => {
    const timeZones = DateHelper.getTimeZonesUTC();
    expect(Array.isArray(timeZones)).toBe(true);
    expect(timeZones.some((timeZone) => /\(UTC [+-] \d{2}:\d{2}\)/.test(timeZone))).toBe(false);
  });

  it("should format a timestamp in hours with time zone", () => {
    const timestamp = 1635200000;
    const timeZone = "America/New_York";
    const formattedTime = DateHelper.formatTimestampInHours(timestamp, timeZone);
    expect(formattedTime).toMatch(/^\w{3} \d{2}:\d{2} [APap][Mm]$/);
  });

  it("should format a timestamp with time zone without time", () => {
    const timestamp = 1635200000;
    const timeZone = "America/New_York";
    const formattedDate = DateHelper.getDateFromTimestampWithTimeZoneWithoutTime(timestamp, timeZone);
    expect(formattedDate).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it("should generate a date range", () => {
    const interval: Interval = {
      from: "2023-10-01",
      to: "2023-10-05"
    };

    const dateIterator = DateHelper.dateRange(interval, DateDiff.Days, 1);
    const generatedDates = Array.from(dateIterator);
    const expectedDates = [
      moment("2023-10-01").toDate(),
      moment("2023-10-02").toDate(),
      moment("2023-10-03").toDate(),
      moment("2023-10-04").toDate(),
      moment("2023-10-05").toDate()
    ];

    expect(generatedDates).toEqual(expectedDates);
  });

  it("should format time using default format", () => {
    const timeString = "14:30:00";
    const formattedTime = DateHelper.formatTime(timeString);
    expect(formattedTime).toBe("2:30 PM");
  });

  it("should return the current date for an empty input", () => {
    const result = DateHelper.toDate();
    expect(result).toBeInstanceOf(Date);
  });

  it("should return an array of time zones in UTC format", () => {
    const timeZones = DateHelper.getTimeZonesUTC();
    expect(Array.isArray(timeZones)).toBe(true);
    const timeZoneWithUTCFormat = timeZones.find((timeZone) => /.*\(UTC [-+]\d{2}:\d{2}\)/.test(timeZone));
    expect(timeZoneWithUTCFormat).toBeUndefined();
  });

  it("should format a timestamp in days with time zone", () => {
    const timestamp = 1679740800;
    const timeZone = "America/New_York";
    const expectedFormattedDate = "25 Mar 2023";
    const formattedDate = DateHelper.formatTimestampInDays(timestamp, timeZone);
    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it("should return a Moment object for a given timestamp", () => {
    const timestamp = 1679740800;
    const momentObject = DateHelper.getDateMoment(timestamp);
    expect(momentObject.isValid()).toBe(true);
    const expectedDate = new Date("2023-03-25T10:40:00.000Z");
    expect(momentObject.toDate()).toEqual(expectedDate);
  });

  it("should get a date from a moment without a specific time zone", () => {
    const momentObject = DateHelper.getDateFromMomentWithTimeZone(moment("2023-03-24T10:00:00"));
    expect(momentObject.isValid()).toBe(true);
    const expectedDate = moment("2023-03-24T10:00:00");
    const momentString = momentObject.format();
    const expectedString = expectedDate.format();
    expect(momentString).toEqual(expectedString);
  });
});
