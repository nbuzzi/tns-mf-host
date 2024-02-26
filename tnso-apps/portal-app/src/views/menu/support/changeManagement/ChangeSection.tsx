import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useAsyncCall } from '../../../../hooks/useAsyncCallShared';
import { ChangeTicketsGrid } from '../../../../components/changeTickets/ChangeTicketsGrid';
import { store } from '../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { builderTicketQueryParams } from '../../../../store/changeTickets/tableConfig';
import withAuthorization from '../../../../HOC/withAuthorization';
import { AuthHelper } from '../../../../helpers/auth/AuthHelper';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

/**
 * ChangeSectionInternal is a functional component that renders a container with a grid view of change tickets
 * or a schedule graph view based on the current state of gridView. The component fetches data from the server and
 * displays it using the ChangeTicketsGrid or ScheduleGraph component. It also has a button to toggle between the
 * two views and updates the title of the container accordingly.
 *
 * @return {JSX.Element} Returns a React functional component
 * @tsx {React.FC} React functional component
 */
const ChangeSectionInternal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { changeTicket } = store;
  const [currentLanguage, setCurrentLanguage] = useState(
    store.shared.currentLanguage
  );

  const loader = useAsyncCall(async () => {
    const params = builderTicketQueryParams({
      currentPage: 0,
      recordsPerPage: 10,
    });
    if (!changeTicket.isGridView) {
      await changeTicket.loadData();
      await changeTicket.loadScheduleGraph();
    } else {
      await changeTicket.loadData(params);
    }
  }, [changeTicket]);
  useEffect(() => {
    setCurrentLanguage(store.shared.currentLanguage);
  }, [store.shared.currentLanguage, i18n]);
  useEffect(() => {
    i18n.changeLanguage(currentLanguage).catch((error) => {
      console.error('Error changing language:', error);
    });
  }, [currentLanguage, i18n]);

  // Return component with conditional rendering based on loader state variable
  return loader.completed ? (
    <Container fluid className="container-change-section mt-3 card-profile">
      <Row className="my-3">
        <Col className="m-auto">
          {/* Display title */}
          <h3 className="um-title mb-0">
            <Text
              text={t(
                TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT[
                  changeTicket.currentTitle as unknown as keyof typeof TRANSLATION.SIDEBAR.SUPPORT.CHANGEMANAGMENT
                ]
              )}
            />
          </h3>
        </Col>
      </Row>
      {/* Display either ChangeTicketsGrid or ScheduleGraph component based on gridView state variable */}
      {<ChangeTicketsGrid />}
    </Container>
  ) : (
    // Display spinner while loading data
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: '90vh' }}
    >
      <Spinner animation="border" variant="primary" />
    </Container>
  );
};
const ChangeSection = withAuthorization(
  observer(ChangeSectionInternal),
  AuthHelper.getAllowedRolesForRoute('changeManagement')
);
export default ChangeSection;
