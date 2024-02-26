import React from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputs: any[];
  backgroundColor: string;
  text: string;
  status: Status;
  length: number;
}

export enum Status {
  primray = "primary",
  secondary = "secondary",
  offline = "offline"
}

export const CustomNode: React.FC<Props> = ({ inputs, backgroundColor, text, status, length }) => {
  const colorText = status === Status.secondary ? "black" : "white";
  const widthAndHeight = length > 15 ? "70px" : "80px";
  const paddingTop = length > 15 ? "20px" : "25px";

  return (
    <div
      style={{ background: backgroundColor, borderRadius: "50px", width: widthAndHeight, height: widthAndHeight, border: "1px solid black" }}
      data-testid="costom-node-component">
      <div style={{ color: colorText, textAlign: "center", paddingTop: paddingTop, fontWeight: "500", fontSize: "19px" }}>{text}</div>
      <div>
        {inputs.map((port) =>
          React.cloneElement(port, {
            style: { background: backgroundColor }
          })
        )}
      </div>
    </div>
  );
};
