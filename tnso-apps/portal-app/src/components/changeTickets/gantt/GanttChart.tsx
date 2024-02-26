import React from "react";
import "./GanttChart.scss";
// import { Task, Gantt, ViewMode } from "gantt-task-react-v2";
import { observer } from "mobx-react";
import { ScheduleGraphResponse } from "../../../interfaces/changeTickets/changeTickets";
export interface Props {
  dataTasks?: ScheduleGraphResponse;
}
export const GanttChart: React.FC<Props> = observer(({ dataTasks }) => {
  return <div className="py-2"></div>;
});
