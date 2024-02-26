import React from 'react';
import Text from 'i18n-module/i18nModule';
interface Props {
  color: string;
  label: string;
  width?: string;
  height?: string;
}

export const LegendOptions: React.FC<Props> = ({
  color,
  label,
  width,
  height,
}) => {
  const style = {
    backgroundColor: color,
    width: width ?? '15px',
    height: height ?? '15px',
    borderRadius: '5%',
    border: '1px solid white',
  };

  return (
    <div
      className="d-flex gap-1 align-items-center justify-content-start"
      data-testid="legend-options-component"
    >
      <div style={style} />
      <small className="text-leyend">
        <Text text={label} />
      </small>
    </div>
  );
};
