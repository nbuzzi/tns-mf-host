import React, { useCallback } from "react";
import { SignalQualityType } from "../../../../interfaces/devices/cellular/cellularSignal";
import { COLORS } from "../../../../utils/const/colors";

interface Props {
  valueSignal: string | number;
  statusSignal: SignalQualityType;
}
export const RawDataBody: React.FC<Props> = ({ valueSignal, statusSignal }) => {
  const bgColor = COLORS.BARS;

  const assignColors = (status: SignalQualityType): Record<string, string> => {
    switch (status) {
      case SignalQualityType.Poor:
        return { background: bgColor.RED, color: "black" };
      case SignalQualityType.Fair:
        return { background: bgColor.ORANGE, color: "black" };
      case SignalQualityType.Good:
        return { background: bgColor.YELLOW, color: "black" };
      case SignalQualityType.Excellent:
        return { background: bgColor.GREEN, color: "black" };
      default:
        return { background: "transparent", color: "white" };
    }
  };

  const handleValue = useCallback((value: string | number) => {
    return Number.isInteger(value) || typeof value === "string" ? value : Number(value).toFixed(1);
  }, []);

  return (
    <td
      style={{ color: assignColors(statusSignal).color, backgroundColor: assignColors(statusSignal).background }}
      key={valueSignal}
      className="border p-2 text-center"
      data-testid="data-row-body">
      {handleValue(valueSignal)}
    </td>
  );
};
