import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../../../../utils/const/translation';
import { LVCDataTable } from '../../../../../../components/device/lvc/LVCDataTable';

import { store } from '../../../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { TNSOCard } from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';

export const LogicalVirtualCircuits: React.FC = observer(() => {
  const { t } = useTranslation();
  const totalRecords = useMemo(
    () =>
      store.device?.lvc.data?.totalRecords &&
      store.device?.lvc.data?.totalRecords > 0
        ? store.device?.lvc.data?.totalRecords
        : undefined,
    [store.device.lvc.data]
  );

  return (
    <TNSOCard>
      <Card.Body>
        <Card.Title className="w-100 text-wrap main-title ">
          <Text
            text={t(
              TRANSLATION.SIDEBAR.MONITORING.DEVICES.logicalVirtualCircuits
            )}
          />
        </Card.Title>
        <LVCDataTable
          lvcs={store.device.lvc.lvcs ?? []}
          totalRecords={totalRecords}
        />
      </Card.Body>
    </TNSOCard>
  );
});
