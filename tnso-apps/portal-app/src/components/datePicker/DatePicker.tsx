import React, { useCallback } from "react";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { DateHelper } from "../../helpers/shared/DateHelper";

import "./DatePicker.scss";

interface DatePProps {
  setDate: (date: string) => void;
  date?: string;
}

export const DateP = ({ setDate, date }: DatePProps): JSX.Element => {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const handleChangeDate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (dateObject: any): void => {
      const dateString = dateObject.format("YYYY-MM-DD HH:mm");
      const date = DateHelper.convertToDateObject(dateString);
      setDate(date);
    },
    [setDate]
  );

  return (
    <div className="d-flex gap-3 mb-2 datepicker">
      <div>
        <DatePicker
          value={date ?? new Date().toISOString()}
          onChange={handleChangeDate}
          render={<InputIcon />}
          format="D MMM YYYY hh:mm A"
          weekDays={weekDays}
          plugins={[weekends([6]), <TimePicker key={date} hideSeconds />]}
          data-testid="date-picker-component">
          <button className="Remove" data-testid="date-picker-remove-button">
            Remove
          </button>
          <button className="Done" data-testid="date-picker-donde-button">
            Done
          </button>
        </DatePicker>
      </div>
    </div>
  );
};
