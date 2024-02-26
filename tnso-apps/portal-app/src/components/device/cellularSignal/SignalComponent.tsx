import React, { useEffect, useState } from "react";
import { COLORS } from "../../../utils/const/colors";
import { observer } from "mobx-react";
import { SignalQualityType } from "../../../interfaces/devices/cellular/cellularSignal";

interface Props {
  signalQuality?: SignalQualityType;
  width?: string;
  height?: string;
}

export const SignalComponent: React.FC<Props> = observer(({ width, height, signalQuality }): JSX.Element => {
  const { GREEN, YELLOW, ORANGE, RED, TRANSPARENT, DARK_BLUE } = COLORS.BARS;
  const [colors, setColors] = useState(Array.from(Array(5).keys()).map(() => COLORS.BARS.TRANSPARENT));

  useEffect(() => {
    if (signalQuality === SignalQualityType.Excellent) {
      setColors(colors.map(() => GREEN));
    } else if (signalQuality === SignalQualityType.Good) {
      setColors(colors.map((_, index) => (index > 3 ? TRANSPARENT : YELLOW)));
    } else if (signalQuality === SignalQualityType.Fair) {
      setColors(colors.map((_, index) => (index > 2 ? TRANSPARENT : ORANGE)));
    } else if (signalQuality === SignalQualityType.Poor) {
      setColors(colors.map((_, index) => (index > 1 ? TRANSPARENT : RED)));
    } else {
      setColors(colors.map(() => TRANSPARENT));
    }
  }, [signalQuality]);

  return (
    <svg className="col m-auto" width={width ? width : "100"} height={height ? height : "100"} fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="signal-component">
      <path d="M1.03676 70.3967L15.8624 57.2297V71.3298H0L1.03676 70.3967Z" fill={`${colors[0]}`} stroke={colors[0] === TRANSPARENT ? DARK_BLUE : ""} />
      <path d="M17.5212 55.7783L32.8652 42.9224V71.3299H17.5212V55.7783Z" fill={`${colors[1]}`} stroke={colors[1] === TRANSPARENT ? DARK_BLUE : ""} />
      <path d="M34.6819 41.4709L50.0259 28.6149V71.3299H34.6819V41.4709Z" fill={`${colors[2]}`} stroke={colors[2] === TRANSPARENT ? DARK_BLUE : ""} />
      <path d="M51.669 27.1635L67.013 14.3075V71.33H51.669V27.1635Z" fill={`${colors[3]}`} stroke={colors[3] === TRANSPARENT ? DARK_BLUE : ""} />
    </svg>
  );
});
