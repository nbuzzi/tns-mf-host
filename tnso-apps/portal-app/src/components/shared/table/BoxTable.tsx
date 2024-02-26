import React from "react";

interface BoxTableProps {
  children: React.ReactNode;
}

export const BoxTable: React.FC<BoxTableProps> = ({ children }): JSX.Element => {
  const stylesToBox = React.useMemo(
    () => ({
      border: "1px solid #dee2e6",
      borderRadius: "0.3rem",
      margingBottom: "1rem",
      marginTop: "1rem"
    }),
    []
  );

  return (
    <div style={stylesToBox} data-testid="box-table">
      {children}
    </div>
  );
};
