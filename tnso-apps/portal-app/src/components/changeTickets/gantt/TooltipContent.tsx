import React from 'react';
import { DateHelper } from '../../../helpers/shared/DateHelper';
import { store } from '../../../store/StoreMobx';
import { TRANSLATION } from '../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  task?: any;
}
export const TooltipContent: React.FC<Props> = ({ task }) => {

  const convertDateToduration = (start?: Date, end?: Date): string => {
    if (start && end) {
      // Calculate the difference in milliseconds between the two dates
      const differenceInMilliseconds = Math.abs(
        end.getTime() - start.getTime()
      );

      // Convert the difference to hours with one decimal point
      const durationInHours = differenceInMilliseconds / (1000 * 60 * 60);

      // Round to one decimal point and return the duration
      return durationInHours.toFixed(1);
    }
    return '0';
  };

  return (
    <div
      className="gantt-tooltip-container d-flex flex-column p-3"
      data-testid="tooltip-gantt-component"
    >
      <span>
        <b>
          <Text text={TRANSLATION.SHARED.TABLE.ticketId} />:
        </b>
        {task?.name}
      </span>
      <span>
        {task?.start && (
          <>
            <b>
              <Text text={TRANSLATION.SHARED.TABLE.startDate} />:
            </b>
            {DateHelper.getDateFromTimestampWithTimeZone(
              task.start.getTime() / 1000,
              store.auth.userInfo?.timeZone
            )}
          </>
        )}
      </span>
      <span>
        <b>
          <Text text={TRANSLATION.SHARED.TABLE.duration} />:
        </b>
        {convertDateToduration(task?.start, task?.end)}
        <Text text={TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.hrs} />
      </span>
    </div>
  );
};
