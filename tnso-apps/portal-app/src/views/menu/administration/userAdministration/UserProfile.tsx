import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAsyncCall } from '../../../../hooks/useAsyncCallShared';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import withAuthorization from '../../../../HOC/withAuthorization';
import { AuthHelper } from '../../../../helpers/auth/AuthHelper';
import { User } from '../../../../interfaces/users/user';
import ModalComponent from '../../../../components/shared/modal/ModalComponent';
import { columns } from '../../../../store/user/tableConfig';
import { TRANSLATION } from '../../../../../src/utils/const/translation';
import { TranslationHelper } from '../../../../helpers/shared/TranslationHelper';
import { TNSOGrid, TNSOButton, Variants } from '@tnso/ui-components/dist';
import { ColumnsType } from 'antd/lib/table';
import { MessageHelper } from '../../../../helpers/shared/MessageHelper';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

const UserProfileInternal: React.FC = () => {
  const { user } = store;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const recordsPerPage = 10;
  const totalRecords = useMemo(
    () =>
      user?.data?.totalRecords && user?.data?.totalRecords > 0
        ? user?.data?.totalRecords
        : undefined,
    [user?.data?.totalRecords]
  );
  const loadMethod = useCallback(
    async (page: number, pageSize: number) => {
      await user.loadData({ startAtRecord: page, recordsPerPage: pageSize });
    },
    [user]
  );

  const handleActAs = useCallback(async (username: string): Promise<void> => {
    await store.auth.actAs(username);
  }, []);

  const handleNavigate = useCallback(
    (item?: User) => {
      if (item) {
        if (item?.onboarded) {
          user.cleanUser();
          user.setUser(item);
          navigate(`/user/profile/user-administration/${item.username}`);
        } else {
          MessageHelper.warningMessage(
            i18n.t(TRANSLATION.ERROR.errorUserNotOnboarded)
          );
        }
      } else {
        user.cleanUser();
        navigate('/user/profile/user-administration/new-user');
      }
    },
    [navigate, user]
  );

  useEffect(() => {
    const disabledButtons = document.querySelectorAll('button:disabled');
    const nonDisabledButtons = document.querySelectorAll(
      'button:not([disabled])'
    );
    Array.from(disabledButtons).forEach((button) =>
      button.parentElement?.classList.add('td-disabled')
    );
    Array.from(nonDisabledButtons).forEach((button) =>
      button.parentElement?.classList.remove('td-disabled')
    );
  }, [user.data]);

  const modalContent = useMemo(
    () => (
      <>
        <p className="text-center">
          <Text
            text={t(
              TRANSLATION.SIDEBAR.ADMINISTRATION.USER
                .youAreAboutToImpersonateAsTheFollowingUser
            )}
          />{' '}
          <b>{user.userSelected?.username}</b>
        </p>
        <p className="text-center">
          <Text
            text={t(
              TRANSLATION.SIDEBAR.ADMINISTRATION.USER
                .keepInMindAllTheActionsYouPerformWillAffectToTheRealUser
            )}
          />
        </p>
      </>
    ),
    [t, user.userSelected?.username]
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

  const grid = useMemo(() => {
    return (
      <TNSOGrid
        columns={TranslationHelper.columnsTranslation(
          columns.users as unknown as ColumnsType[]
        )}
        dataSource={TranslationHelper.dataTranslation(user.data?.users ?? [], [
          'status',
          'role',
          'actAs',
        ])}
        totalRecords={totalRecords}
        handleGoToPage={handleChangePage}
        loading={loading}
        emptyMessage={i18n.t(TRANSLATION.SHARED.DATATABLE.noDataAvailable)}
        showPagination={true}
        handleSelectRow={handleNavigate}
        onChange={columns.handleSort}
      />
    );
  }, [
    handleChangePage,
    loading,
    t,
    totalRecords,
    user.data?.users,
    handleNavigate,
  ]);

  return loader ? (
    <Container fluid className="container-user-profile mt-3 card-profile">
      <Row className="my-3">
        <Col className="m-auto">
          <h3 className="um-title mb-0">
            <Text
              text={t(
                TRANSLATION.SIDEBAR.ADMINISTRATION.USER
                  .userProfileAdministration
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
        showModal={user.showModal}
        handleClose={(): void => user.setShowModal(false)}
        buttonCancel={i18n.t(TRANSLATION.SHARED.cancel)}
        buttonSubmit={i18n.t(TRANSLATION.SHARED.accept)}
        handleSubmit={(): Promise<void> =>
          handleActAs(user.userSelected?.username ?? '')
        }
      >
        {modalContent}
      </ModalComponent>
    </Container>
  ) : null;
};

// to get allowed roles for routes, use the route name from Router.tsx
const UserProfile = withAuthorization(
  observer(UserProfileInternal),
  AuthHelper.getAllowedRolesForRoute('userAdministration')
);

export default UserProfile;
