import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAsyncCall } from '../../../../hooks/useAsyncCallShared';
import { AuthHelper } from '../../../../helpers/auth/AuthHelper';
import ModalComponent from '../../../../components/shared/modal/ModalComponent';
import withAuthorization from '../../../../HOC/withAuthorization';
import { CompanyProfile as CompanyProfileModel } from '../../../../interfaces/companyProfiles/company';
import { MapperHelper } from '../../../../helpers/shared/MapperHelper';

import { store } from '../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import './CompanyProfile.scss';
import { TRANSLATION } from '../../../../utils/const/translation';
import { TNSOGrid, TNSOButton, Variants } from '@tnso/ui-components/dist';
import { TranslationHelper } from '../../../../helpers/shared/TranslationHelper';
import { columns } from '../../../../store/companyProfile/tableConfig';
import { ColumnsType } from 'antd/lib/table';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

const CompanyProfileInternal: React.FC = (): JSX.Element | null => {
  const { companyProfile, user } = store;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [companySelected] = useState<string>('');
  const [dataTable, setDataTable] = useState<CompanyProfileModel[]>();
  const recordsPerPage = 10;
  const totalRecords = useMemo(
    () =>
      companyProfile?.data?.totalRecords &&
      companyProfile?.data?.totalRecords > 0
        ? companyProfile?.data?.totalRecords
        : undefined,
    [companyProfile?.data?.totalRecords]
  );
  const loadMethod = useCallback(
    async (page: number, pageSize: number) => {
      await companyProfile.loadData({
        startAtRecord: page,
        recordsPerPage: pageSize,
      });
    },
    [companyProfile]
  );

  const handleChangePage = useCallback(
    async (page: number): Promise<void> => {
      setLoading(true);
      const startAtRecord = (page - 1) * recordsPerPage;
      await loadMethod(startAtRecord, recordsPerPage);
      setLoading(false);
    },
    [loadMethod, recordsPerPage]
  );

  const loader = useAsyncCall(async () => {
    await loadMethod(0, recordsPerPage);
  }, []);

  const handleDeleteCompany = useCallback(async () => {
    await companyProfile.delete(companyProfile.companyNameSelected);
    companyProfile.setShowModalDelete(false);
    await loadMethod(0, recordsPerPage);
  }, [companyProfile, loadMethod, recordsPerPage]);

  const handleNavigate = useCallback(
    (item?: CompanyProfileModel) => {
      store.companyProfile.resetData();
      if (item) {
        store.companyProfile.setData(item);
        navigate(`/administration/${item.name}`);
      } else {
        navigate('/administration/new-company-profile');
      }
    },
    [navigate]
  );

  const contentToModal = useMemo(
    () => (
      <div className="d-flex flex-column align-items-center pt-5">
        {user?.data?.users && user?.data?.users.length > 0 ? (
          <>
            <p className="mb-4">
              <b>{companySelected}</b>
              <Text
                text={t(
                  TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                    .isActivelyAssociatedWithTheseUsers
                )}
              />
              :
            </p>
            <p
              className="w-75 text-truncate"
              title={user?.data?.users
                .map((user) => ` ${user.username}`)
                .toString()}
            >
              {user?.data?.users.map((user) => ` ${user.username}`).toString()}
            </p>
          </>
        ) : (
          <p className="mb-4">
            {companySelected}
            <Text
              text={t(
                TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                  .isNotAssociatedWithAnyUsers
              )}
            />
            .
          </p>
        )}
        <span className="mt-4">
          <Text
            text={t(
              TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                .areYouSureYouWantToDeleteThisCompany
            )}
          />
        </span>
      </div>
    ),
    [t, user?.data?.users, companySelected]
  );

  useEffect(() => {
    if (companyProfile.data?.companyProfiles) {
      setDataTable(
        MapperHelper.mapCompanyProfile(companyProfile.data.companyProfiles)
      );
    }
  }, [companyProfile.data?.companyProfiles]);

  const grid = useMemo(() => {
    return (
      <TNSOGrid
        columns={TranslationHelper.columnsTranslation(
          columns.companies as unknown as ColumnsType[]
        )}
        dataSource={TranslationHelper.dataTranslation(
          dataTable?.map((data, index) => ({
            key: data.name + index,
            ...data,
          })) ?? [],
          ['canBeDeleted']
        )}
        totalRecords={totalRecords}
        handleGoToPage={handleChangePage}
        loading={loading}
        emptyMessage={i18n.t(TRANSLATION.SHARED.DATATABLE.noDataAvailable)}
        showPagination={true}
        handleSelectRow={handleNavigate}
      />
    );
  }, [dataTable, handleChangePage, loading, t, totalRecords]);

  return loader ? (
    <Container fluid className="container-user-profile mt-3 card-profile">
      <Row className="my-3">
        <Col className="m-auto">
          <h3 className="um-title mb-0">
            <Text
              text={t(
                TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                  .companyProfileAdministration
              )}
            />
          </h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col
          md={{ span: 1, offset: 11 }}
          className="d-flex justify-content-end"
        >
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <TNSOButton
            variant={Variants.Primary}
            onClick={(): void => handleNavigate()}
          >
            <Text text={t(TRANSLATION.SHARED.create)} />
          </TNSOButton>
        </Col>
      </Row>
      {grid}
      <ModalComponent
        showModal={showModal}
        // eslint-disable-next-line react/jsx-no-bind
        handleClose={(): void => setShowModal(false)}
        buttonCancel={i18n.t(TRANSLATION.SHARED.cancel)}
        buttonSubmit={i18n.t(TRANSLATION.SHARED.delete)}
      >
        {contentToModal}
      </ModalComponent>
      <ModalComponent
        showModal={companyProfile.showModalDelete}
        // eslint-disable-next-line react/jsx-no-bind
        handleClose={(): void => companyProfile.setShowModalDelete(false)}
        // eslint-disable-next-line react/jsx-no-bind
        handleSubmit={(): Promise<void> => handleDeleteCompany()}
        buttonCancel={i18n.t(TRANSLATION.SHARED.cancel)}
        buttonSubmit={i18n.t(TRANSLATION.SHARED.delete)}
      >
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <Text
          text={t(
            TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
              .areSureYouWantToDeleteThisCompanyProfile
          )}
        />
      </ModalComponent>
    </Container>
  ) : null;
};

// to get allowed roles for routes, use the route name from Router.tsx
const CompanyProfile = withAuthorization(
  observer(CompanyProfileInternal),
  AuthHelper.getAllowedRolesForRoute('companyAdministration')
);

export default CompanyProfile;
