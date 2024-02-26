import React, { useCallback } from "react";
import MembersConnectivity from "../../../members/tabs/MembersConnections";
import { store } from "../../../../../../store/StoreMobx";
import { observer } from "mobx-react";
import { useAsyncCall } from "../../../../../../hooks/useAsyncCall";

export const Members: React.FC = observer(() => {
  const { detail } = store.device;

  const loadMethod = useCallback(async () => {
    if (detail.data?.acna) {
      await store.member.loadData(detail.data?.acna);
      await store.member.loadMembersGraph(detail.data?.acna);
    }
  }, [detail.data?.acna]);

  useAsyncCall(loadMethod, [loadMethod]);

  return <MembersConnectivity isTabMembers={true} />;
});
