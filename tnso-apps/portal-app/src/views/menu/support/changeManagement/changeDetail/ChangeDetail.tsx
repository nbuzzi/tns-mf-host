import React, { useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { store } from '../../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useAsyncCall } from '../../../../../hooks/useAsyncCallShared';
import { DateHelper } from '../../../../../helpers/shared/DateHelper';
import withAuthorization from '../../../../../HOC/withAuthorization';
import { AuthHelper } from '../../../../../helpers/auth/AuthHelper';
import { Divider } from 'antd';
import { TRANSLATION } from '../../../../../utils/const/translation';
import { useTranslation } from 'react-i18next';
import { columns } from '../../../../../store/changeTickets/tableConfig';
import { TranslationHelper } from '../../../../../helpers/shared/TranslationHelper';
import {
  TNSOGrid,
  TNSOCard,
  TNSOTextarea,
  TNSOButton,
  Variants,
} from '@tnso/ui-components/dist';
import { ColumnsType } from 'antd/lib/table';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

/**
 * ChangeDetailInternal component displays the change ticket details form.
 * It allows the user to view the details of the change ticket and make changes.
 * It also has fields for the user to input reasons for the change, changes planned, and expected service impact.
 *
 * @return {JSX.Element} JSX element that displays the form for viewing and changing the details of a change ticket.
 */
const ChangeDetailInternal: React.FC = (): JSX.Element | null => {
  const navigate = useNavigate();
  const params = useParams();
  const ticketId = params.changeTicketId;
  const { changeTicket } = store;
  const { t } = useTranslation();

  /**
   * goBack function navigates the user back to the previous page.
   *
   * @return {void}
   */
  const goBack = (): void => {
    navigate(-1);
  };

  const loadData = useCallback(async () => {
    // Load data for the selected ticket
    if (ticketId) {
      await changeTicket.loadDataByTicketId(ticketId);
    }
  }, [changeTicket]);

  const loader = useAsyncCall(loadData, [ticketId]);

  const grid = useMemo(() => {
    return (
      <TNSOGrid
        dataSource={changeTicket?.changeTicket?.devices ?? []}
        emptyMessage={i18n.t(TRANSLATION.SHARED.DATATABLE.noDataAvailable)}
        columns={TranslationHelper.columnsTranslation(
          columns.devicesEffected as unknown as ColumnsType[]
        )}
        onChange={columns.handleSort}
      />
    );
  }, [changeTicket.changeTicket, t]);

  return loader.completed ? (
    <Container fluid className="container-change-detail mt-3 card-profile">
      <Row className="align-items-center">
        <Col md="auto">
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <TNSOButton variant={Variants.Secondary} onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </TNSOButton>
        </Col>
        <Col className="text-align-bottom">
          <h3 className="um-title mb-0">
            <Text
              text={t(
                TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.changeDetails
              )}
            />
          </h3>
        </Col>
      </Row>
      <Container fluid>
        <Row className="gap-1">
          <Row className="mt-4">
            <Col md={3}>
              <b>
                <Text
                  text={t(
                    TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.changeTicket
                  )}
                />
              </b>
              <span>{ticketId}</span>
            </Col>
            <Col>
              <b>
                <Text
                  text={t(TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.type)}
                />
                :
              </b>
              <span>
                <Text
                  text={t(
                    TRANSLATION.SHARED.DATATABLE[
                      changeTicket?.changeTicket
                        ?.type as keyof typeof TRANSLATION.SHARED.DATATABLE
                    ]
                  )}
                />
              </span>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <b>
                <Text
                  text={t(
                    TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.startDateTime
                  )}
                />
                :
              </b>
              <span>
                {DateHelper.getDateFromTimestampWithTimeZone(
                  changeTicket?.changeTicket?.changeStartTime ?? 0
                )}
              </span>
            </Col>
            <Col>
              <b>
                <Text
                  text={t(
                    TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.impactType
                  )}
                />
                :
              </b>
              <span>
                <Text
                  text={t(
                    TRANSLATION.SHARED.DATATABLE[
                      changeTicket?.changeTicket
                        ?.impactType as keyof typeof TRANSLATION.SHARED.DATATABLE
                    ]
                  )}
                />
              </span>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <b>
                <Text
                  text={t(
                    TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT
                      .maximumDurationHrs
                  )}
                />
                :
              </b>
              <span>{changeTicket?.changeTicket?.maximumDuration}</span>
            </Col>
            <Col>
              <b>
                <Text text={t(TRANSLATION.SHARED.TABLE.status)} />:
              </b>
              <span>
                <Text
                  text={t(
                    TRANSLATION.SHARED.DATATABLE[
                      changeTicket?.changeTicket
                        ?.statusOfChange as keyof typeof TRANSLATION.SHARED.DATATABLE
                    ]
                  )}
                />
                :
              </span>
            </Col>
          </Row>
          <Row className="mx-auto" />
        </Row>
        <Row className="mx-auto" />
      </Container>
      <TNSOCard className="mt-4 p-5">
        <Row className="mx-auto w-100 mb-5">
          <Col md={2}>
            <p>
              <Text
                text={t(
                  TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.reasonForChange
                )}
              />
              :
            </p>
          </Col>
          <Col>
            <TNSOTextarea
              id="reason-for-change"
              rows={3}
              maxLength={300}
              value={changeTicket?.changeTicket?.reasonForChange}
              readOnly
            />
          </Col>
        </Row>
        <Row className="mx-auto w-100 mb-5">
          <Col md={2}>
            <p>
              <Text
                text={t(
                  TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT.changesPlanned
                )}
              />
              :
            </p>
          </Col>
          <Col>
            <TNSOTextarea
              id="changes-planned"
              rows={4}
              maxLength={300}
              value={changeTicket?.changeTicket?.changesPlanned}
              readOnly
            />
          </Col>
        </Row>
        <Row className="mx-auto w-100">
          <Col md="auto">
            <p>
              <Text
                text={t(
                  TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT
                    .expectedServiceImpactDuringChange
                )}
              />
              :
            </p>
          </Col>
          <Col>
            <TNSOTextarea
              id="expected-sereevice-impact-during-change"
              rows={3}
              maxLength={300}
              value={changeTicket?.changeTicket?.changeImpact}
              readOnly
            />
          </Col>
        </Row>
      </TNSOCard>
      <Divider className="w-100" />
      <Row>
        <Col className="text-align-center mb-2">
          <h3 className="um-title mb-0">
            <Text
              text={t(
                TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT
                  .detailsOfDevicesEffectedByChange
              )}
            />
          </h3>
        </Col>
      </Row>
      {grid}
    </Container>
  ) : null;
};

const ChangeDetail = withAuthorization(
  observer(ChangeDetailInternal),
  AuthHelper.getAllowedRolesForRoute('changeManagementDetail')
);

export default ChangeDetail;
