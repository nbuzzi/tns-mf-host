/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-bind */
import React, { Suspense } from "react";
// project imports
import Loader from "./Loader";
// ===========================|| LOADABLE - LAZY LOADING ||=========================== //
// eslint-disable-next-line react/display-name
const Loadable = (Component: any) => (props: any): JSX.Element =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
export default Loadable;
