import React, { useCallback, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import { TRANSLATION } from '../../../../../utils/const/translation';
import { useTranslation } from 'react-i18next';
import { store } from '../../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { useExportDataTable } from '../../../../../hooks/useExportDataTable';
import {
  MembersExportResponse,
  ExportMemberTable,
} from '../../../../../interfaces/memberConnectivity/memberConnectivity';
import { MemberExportService } from '../../../../../service/memberConnectivity/MemberExportService';
import { MapperHelper } from '../../../../../helpers/shared/MapperHelper';
import { MemberHelper } from '../../../../../helpers/member/MemberHelper';
import membersConnectivity from '../../../../../store/memberConnectivity/MemberConnectivity';
import { TNSOCard, TNSOButton, Variants } from '@tnso/ui-components/dist';
import i18n from 'i18n-module/i18n';
import Text from 'i18n-module/i18nModule';

export const ExportAllMembers: React.FC = observer(() => {
  const { member } = store;
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const { t } = useTranslation();
  const handleMembersDataExport = useExportDataTable<
    ExportMemberTable,
    MembersExportResponse
  >(
    member?.data?.totalRecords ?? 0,
    member?.data?.totalRecords ?? 10,
    MemberExportService,
    MemberHelper.builderMembersExportQueryParams,
    i18n.t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.allMemberConnections),
    MapperHelper.mapMembersExport,
    true,
    membersConnectivity.selectedItem
  );

  const handleExport = useCallback(async () => {
    setIsLoadingExport(true);
    await handleMembersDataExport();
    setIsLoadingExport(false);
  }, [handleMembersDataExport]);

  return (
    <Container fluid className="members-container d-flex flex-column">
      <TNSOCard className="card-grid">
        <Row className="w-100 mt-1">
          <div className=" d-flex justify-content-end align-content-end">
            <TNSOButton
              variant={Variants.Secondary}
              onClick={handleExport}
              disabled={isLoadingExport}
              isLoading={isLoadingExport}
            >
              <Text
                text={t(
                  TRANSLATION.SIDEBAR.MONITORING.MEMBERS.downloadAllMembers
                )}
              />
            </TNSOButton>
          </div>
        </Row>
      </TNSOCard>
    </Container>
  );
});
