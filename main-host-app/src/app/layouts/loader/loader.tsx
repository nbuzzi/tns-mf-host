import React from "react";
import { Spinner } from "react-bootstrap";
import "./loader.scss";

const Loader = (): JSX.Element => (
  <div className="fallback-spinner">
    <div className="loading">
      <Spinner variant="primary" animation="border" />
    </div>
  </div>
);

export default Loader;
