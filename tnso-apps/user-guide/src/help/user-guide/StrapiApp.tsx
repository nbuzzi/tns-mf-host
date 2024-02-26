import React from "react";
import { Link } from "react-router-dom";
import { TNSOCard } from '@tnso/ui-components/dist';


const StrapiApp = (): JSX.Element => {
  return (
    <div className="my-3 mx-3 index-strapi" style={{ width: "20%" }}>
      <TNSOCard className="p-3">
        <ul className="custom-list">
          <li className="custom-list-item">
            <Link to="/help/userGuide/introduction">Introduction</Link>
          </li>
          <li className="custom-list-item">
            <Link to="/help/userGuide/monitoring">Monitoring</Link>
          </li>
          <li className="custom-list-item">
            <Link to="/help/userGuide/devices">Device</Link>
          </li>
          <li className="custom-list-item">
            <Link to="/help/userGuide/details">Details</Link>
          </li>
          <li className="custom-list-item">
            <Link to="/help/userGuide/lvc">LVC</Link>
          </li>
        </ul>
      </TNSOCard>
    </div>
  );
};

export default StrapiApp;
