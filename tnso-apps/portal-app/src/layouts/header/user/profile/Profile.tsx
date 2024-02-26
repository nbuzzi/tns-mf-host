import React, { useCallback, useEffect, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import withAuthorization from '../../../../HOC/withAuthorization';
import { AuthHelper } from '../../../../helpers/auth/AuthHelper';
import { DateHelper } from '../../../../helpers/shared/DateHelper';
import user from '../../../../store/user/User';
import ModalComponent from '../../../../components/shared/modal/ModalComponent';

import { store } from '../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { useAsyncCall } from '../../../../hooks/useAsyncCall';

import { UserAssociatedCompanyTable } from '../../../../interfaces/companyProfiles/company';
import { AssociatedCompaniesTable } from './tab/AssociatedCompanies';
import { Divider } from 'antd';
import { Roles } from '../../../../interfaces/auth/roleAndPermission/role';
import _ from 'lodash';
import { TRANSLATION } from '../../../../../src/utils/const/translation';
import {
  TNSOButton,
  TNSOInput,
  TNSOSelector,
  TNSOCard,
  Variants,
} from '@tnso/ui-components/dist';
import { Controller, useForm } from 'react-hook-form';
import { ValidatorHelper } from '../../../../helpers/shared/ValidatorHelper';
import { UserAlternative } from '../../../../interfaces/users/user';
import { MapperHelper } from '../../../../helpers/shared/MapperHelper';

const UserProfileInternal: React.FC = () => {
  const { t } = useTranslation();
  const initialValues = useMemo(() => {
    return {
      username: store.auth.userInfo?.username,
      firstName: store.auth.userInfo?.firstName,
      lastName: store.auth.userInfo?.lastName,
      email: store.auth.userInfo?.email,
      timeZone: store.auth.userInfo?.timeZone,
      role: MapperHelper.mapRolestoRolesByUserList(store.auth.userInfo?.role),
    };
  }, [store.auth.userInfo]);

  const {
    control,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<UserAlternative>({
    defaultValues: initialValues,
    mode: 'all',
  });

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [tableData, setTableData] = React.useState<
    UserAssociatedCompanyTable[]
  >([]);

  const isSuperUser = useMemo(() => {
    return _.isEqual(store.auth.userInfo?.role, Roles.SuperUser);
  }, [store.auth.userInfo]);

  useAsyncCall(async () => {
    if (store.auth.userInfo?.companyProfilesList) {
      setTableData(
        store.auth.userInfo.companyProfilesList.map((company) => {
          return {
            name: company,
          };
        })
      );
    }
  }, [store.auth.userInfo]);

  const handleModal = useCallback(
    (isShowModal: boolean) => {
      setShowModal(isShowModal);
    },
    [setShowModal]
  );

  const handleSubmit = useCallback(
    async (username?: string): Promise<void> => {
      if (username) {
        const isUpdated = await user.updateOwnUser({
          firstName: getValues().firstName,
          lastName: getValues().lastName,
          email: getValues().email,
          timeZone: getValues().timeZone,
        });
        if (isUpdated) {
          store.auth.userInfo = {
            username: store.auth.userInfo?.username ?? '',
            firstName: getValues().firstName ?? '',
            lastName: getValues().lastName ?? '',
            email: getValues().email ?? '',
            timeZone: getValues().timeZone ?? '',
            role: store.auth.userInfo?.role,
          };
        }
      }
      handleModal(false);
    },
    [handleModal]
  );

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const formRender = useMemo(() => {
    return (
      <TNSOCard className="mt-2">
        <Row>
          <Col md={4}>
            <label htmlFor="username">{t(TRANSLATION.SHARED.username)}</label>
            <Controller
              name="username"
              control={control}
              render={({ field }): JSX.Element => (
                <TNSOInput {...field} disabled />
              )}
            />
            {errors.username?.type === 'required' && (
              <small className="text-danger">
                {t(TRANSLATION.LOGIN.usernameRequired)}
              </small>
            )}
            {errors.username?.type === 'min' && (
              <small className="text-danger">
                {t(TRANSLATION.LOGIN.usernameMin)}
              </small>
            )}
            {errors.username?.type === 'max' && (
              <small className="text-danger">
                {t(TRANSLATION.LOGIN.usernameMax)}
              </small>
            )}
            {errors.username?.type === 'validate' && (
              <small className="text-danger">
                {t(
                  TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                    .usernameAlreadyIsUse
                )}
              </small>
            )}
          </Col>
          <Col md={4}>
            <label htmlFor="firstName">{t(TRANSLATION.LOGIN.firstName)}</label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }): JSX.Element => <TNSOInput {...field} />}
            />
            {errors.firstName && errors.firstName.type === 'required' && (
              <small className="text-danger">
                {t(TRANSLATION.LOGIN.firstNameRequired)}
              </small>
            )}
          </Col>
          <Col md={4}>
            <label htmlFor="lastName">{t(TRANSLATION.LOGIN.lastName)}</label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field }): JSX.Element => <TNSOInput {...field} />}
            />
            {errors.lastName && errors.lastName.type === 'required' && (
              <small className="text-danger">
                {t(TRANSLATION.LOGIN.lastNameRequired)}
              </small>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <label htmlFor="email">
              {t(TRANSLATION.SIDEBAR.ADMINISTRATION.USER.email)}
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                validate: async (value) =>
                  value &&
                  (await ValidatorHelper.validateEmail(
                    value,
                    initialValues?.email ?? ''
                  )),
              }}
              render={({ field }): JSX.Element => <TNSOInput {...field} />}
            />
            {errors.email?.type === 'required' && (
              <small className="text-danger">
                {t(TRANSLATION.LOGIN.emailRequired)}
              </small>
            )}
            {errors.email?.type === 'pattern' && (
              <small className="text-danger">
                {t(TRANSLATION.LOGIN.emailMustBeValid)}
              </small>
            )}
            {errors.email?.type === 'validate' && (
              <small className="text-danger">
                {t(
                  TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.emailAlreadyInUse
                )}
              </small>
            )}
          </Col>
          <Col md={4}>
            <label htmlFor="role">
              {t(TRANSLATION.SIDEBAR.ADMINISTRATION.USER.role)}
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }): JSX.Element => (
                <TNSOInput {...field} disabled />
              )}
            />
          </Col>
          <Col md={4}>
            <label htmlFor="timeZone">
              {t(TRANSLATION.SIDEBAR.ADMINISTRATION.USER.timeZone)}
            </label>
            <Controller
              name="timeZone"
              control={control}
              render={({ field }): JSX.Element => (
                <TNSOSelector
                  {...field}
                  options={DateHelper.getTimeZonesUTC().map((tz) => ({
                    label: tz,
                    value: tz,
                  }))}
                  className="w-100"
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={{ span: 1, offset: 11 }}
            className="d-flex justify-content-end mt-2"
          >
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <TNSOButton
              disabled={!isValid}
              variant={Variants.Primary}
              onClick={(): void => handleModal(true)}
            >
              {t(TRANSLATION.SHARED.update)}
            </TNSOButton>
          </Col>
        </Row>
      </TNSOCard>
    );
  }, [
    t,
    control,
    errors.email?.type,
    errors.username?.type,
    errors.firstName?.type,
    errors.lastName?.type,
    handleModal,
    tableData,
    getValues,
    isValid,
  ]);

  return (
    <Container fluid>
      <span className="h4">{t(TRANSLATION.PROFILE.myAccount)}</span>
      {formRender}
      <ModalComponent
        showModal={showModal}
        handleClose={handleModal}
        title={t(TRANSLATION.SHARED.update)}
        buttonCancel={t(TRANSLATION.SHARED.cancel)}
        buttonSubmit={t(TRANSLATION.SHARED.update)}
        // eslint-disable-next-line react/jsx-no-bind
        handleSubmit={(): Promise<void> =>
          handleSubmit(store.auth.userInfo?.username)
        }
      >
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        {t(TRANSLATION.SIDEBAR.ADMINISTRATION.USER.updateUser)}
      </ModalComponent>
      <Divider className="w-100" />
      <div className="d-flex flex-column w-75">
        <div className="d-flex flex-column w-50">
          <AssociatedCompaniesTable
            items={tableData}
            isSuperUser={isSuperUser}
          />
        </div>
      </div>
    </Container>
  );
};

// to get allowed roles for routes, use the route name from Router.tsx
const UserProfile = withAuthorization(
  observer(UserProfileInternal),
  AuthHelper.getAllowedRolesForRoute('profile')
);

export default UserProfile;
