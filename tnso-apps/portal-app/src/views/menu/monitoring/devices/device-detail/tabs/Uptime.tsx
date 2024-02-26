import React, { useCallback } from "react";
import { UptimeChart } from "../../../../../../components/device/uptime/UptimeChart";
import { useAsyncCall } from "../../../../../../hooks/useAsyncCall";

import { store } from "../../../../../../store/StoreMobx";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

export const Uptime: React.FC = observer(() => {
  const { uptime } = store.device;
  const { deviceName } = useParams();

  const loadData = useCallback(async (): Promise<void> => await uptime.loadDataMonthly(deviceName), []);

  const loader = useAsyncCall(loadData, [loadData]);

  return loader.completed ? (
    <div id="device-view" className="d-flex flex-column">
      <UptimeChart />
    </div>
  ) : null;
});
