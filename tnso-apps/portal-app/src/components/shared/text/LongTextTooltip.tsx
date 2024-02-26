import React from "react";

interface LongTextTooltipProps {
  text?: string;
  className?: string;
}
export const LongTextTooltip: React.FC<LongTextTooltipProps> = ({ text, className }): JSX.Element => {
  return (
    <div className={` row ${className} my-auto`} data-testid="tooltip-long-text">
      <div className="text-truncate col my-auto" title={text}>
        <span>{text}</span>
      </div>
    </div>
  );
};
