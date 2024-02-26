import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { useMemo, useCallback, useState } from 'react';
import { MemberSelected } from '../../../../../components/shared/table/memberProperties/MemberSelected';
import { useTranslation } from 'react-i18next';
import membersConnectivity from '../../../../../store/memberConnectivity/MemberConnectivity';
import { store } from '../../../../../store/StoreMobx';
import { ConnectedGraph } from '../../../../../components/membersConnectivity/ConnectedGraph';
import { MembersGrid } from '../../../../../components/membersConnectivity/MembersGrid';
import { MemberHelper } from '../../../../../helpers/member/MemberHelper';
import { TRANSLATION } from '../../../../../utils/const/translation';
import { TNSOCard, TNSOButton, Variants } from '@tnso/ui-components/dist';
import { MemberExportService } from '../../../../../service/memberConnectivity/MemberExportService';
import { useExportDataTable } from '../../../../../hooks/useExportDataTable';
import {
  ExportMemberTable,
  MembersExportResponse,
} from '../../../../../interfaces/memberConnectivity/memberConnectivity';
import { MapperHelper } from '../../../../../helpers/shared/MapperHelper';
import { Spin } from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import Text from 'i18n-module/i18nModule';

interface Props {
  isTabMembers?: boolean;
}
const MembersConnectionsInternal: React.FC<Props> = ({ isTabMembers }) => {
  const { t } = useTranslation();
  const { member } = store;
  const [gridView, setGridView] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<string>('tunnelDetailsView');
  const [previousSelectedItem, setPreviousSelectedItem] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const textError = useMemo(
    () =>
      membersConnectivity.selectedItem ? (
        <Text
          text={t(
            TRANSLATION.SIDEBAR.MONITORING.MEMBERS.noMemberConnectionsConfigured
          )}
        />
      ) : (
        <Text
          text={t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.noMemberSelected)}
        />
      ),
    [membersConnectivity.selectedItem]
  );
  const thereIsData = useMemo(
    () =>
      Boolean(
        member?.data &&
          ((member.data.members &&
            member.data.members.length > 0 &&
            member?.membersGraph) ||
            member.membersGraph.srcAcna !== '')
      ) || false,
    [
      member.data,
      member?.data?.members,
      membersConnectivity.selectedItem,
      member?.membersGraph,
      member.membersGraph.srcAcna,
    ]
  );

  const handleExportData = useExportDataTable<
    ExportMemberTable,
    MembersExportResponse
  >(
    member?.data?.totalRecords ?? 0,
    10,
    MemberExportService,
    MemberHelper.builderMembersExportQueryParams,
    `${(
      <Text text={t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.noMemberSelected)} />
    )} ${membersConnectivity.selectedItem}`,
    MapperHelper.mapMembersExport
  );

  const handleExport = useCallback(async (): Promise<void> => {
    setIsLoadingExport(true);
    await handleExportData();
    setIsLoadingExport(false);
  }, [handleExportData]);

  const handleGridView = useCallback(async (): Promise<void> => {
    setGridView((prevValue) => !prevValue);
    setTextButton((prevValue) =>
      prevValue === 'tunnelDetailsView'
        ? 'connectionGraphView'
        : 'tunnelDetailsView'
    );
  }, [t]);

  useEffect(() => {
    if (isTabMembers) {
      MemberHelper.builderMembersExportQueryParams({
        tableFilters: { acna: membersConnectivity.selectedItem },
      });
    }
  });

  const handleItemSelect = useCallback(
    async (item: string) => {
      if (previousSelectedItem !== item || !item) {
        setPreviousSelectedItem(item ?? item);
        membersConnectivity.selectedItem = item;
        MemberHelper.builderMembersExportQueryParams({
          tableFilters: { acna: item },
        });
        setLoading(true);
        await membersConnectivity.loadData(item);
        await membersConnectivity.loadMembersGraph(item);
        setLoading(false);
      }
    },
    [previousSelectedItem, setLoading]
  );

  return (
    <Container fluid className="members-container d-flex flex-column">
      <TNSOCard className="card-grid">
        <Row className="w-100 mt-1">
          <Col className="m-auto">
            <Col md={2}>
              {!isTabMembers && (
                <div className="d-flex align-items-center">
                  <p className="m-2">
                    <Text
                      text={t(TRANSLATION.SIDEBAR.MONITORING.MEMBERS.member)}
                    />
                  </p>
                  <MemberSelected
                    selectedItem={membersConnectivity.selectedItem}
                    onSelect={handleItemSelect}
                  />
                </div>
              )}
            </Col>
          </Col>
          {gridView && member?.data?.totalRecords ? (
            <Col md="auto">
              <TNSOButton
                variant={Variants.OutlinePrimary}
                onClick={handleExport}
                isLoading={isLoadingExport}
                disabled={isLoadingExport}
              >
                {isLoadingExport ? (
                  <Spin indicator={<LoadingOutlined spin />} size="small" />
                ) : (
                  <DownloadOutlined />
                )}
              </TNSOButton>
            </Col>
          ) : null}
          <Col md="auto">
            <TNSOButton
              onClick={handleGridView}
              disabled={!member?.data?.totalRecords}
              variant={Variants.Primary}
            >
              <Text
                text={t(
                  TRANSLATION.SIDEBAR.MONITORING.MEMBERS.BUTTON[
                    textButton as keyof typeof TRANSLATION.SIDEBAR.MONITORING.MEMBERS.BUTTON
                  ]
                )}
              />
            </TNSOButton>
          </Col>
        </Row>
        {!thereIsData && !loading && (
          <div className="text-center text-status no-data">
            <span data-testid="empty-message">{textError}</span>
          </div>
        )}
        {thereIsData ? (
          gridView ? (
            <MembersGrid membersData={member.data} />
          ) : (
            <ConnectedGraph membersGraph={member.membersGraph} />
          )
        ) : null}
      </TNSOCard>
    </Container>
  );
};

const MembersConnectivity = observer(MembersConnectionsInternal);
export default MembersConnectivity;
