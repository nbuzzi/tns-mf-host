import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { store } from '../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import withAuthorization from '../../../../HOC/withAuthorization';
import { AuthHelper } from '../../../../helpers/auth/AuthHelper';
import TransferList from '../../../../components/transferList/TransferList';
import { useNavigate, useParams } from 'react-router-dom';
import ModalComponent from '../../../../components/shared/modal/ModalComponent';
import { User } from '../../../../interfaces/users/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useAsyncCall } from '../../../../hooks/useAsyncCallShared';
import { DateHelper } from '../../../../helpers/shared/DateHelper';
import { RoleHelper } from '../../../../helpers/role/RoleHelper';
import { RolesByUserList } from '../../../../interfaces/auth/roleAndPermission/role';
import { Steps } from 'antd';
import { TRANSLATION } from '../../../../utils/const/translation';
import { Controller, Form, useForm } from 'react-hook-form';
import {
  TNSOInput,
  TNSOSelector,
  TNSOButton,
  TNSOCard,
  Variants,
} from '@tnso/ui-components/dist';
import _ from 'lodash';
import { Checkbox } from 'antd/lib';
import { ValidatorHelper } from '../../../../helpers/shared/ValidatorHelper';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

enum ButtonType {
  CREATE = 'create',
  UPDATE = 'update',
}

const AssociateCompanyProfilesInternal: React.FC = (): JSX.Element | null => {
  const { companyProfile, user } = store;
  const { t } = useTranslation();
  // const { username } = useParams();
  const params = useParams();
  const navigate = useNavigate();

  const recordsPerPage = 10;

  const [userData, setUserData] = useState<User>();
  const [textButton, setTextButton] = useState<ButtonType>(ButtonType.CREATE);
  const [textSteps, setTextSteps] = useState<string>(
    i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.next)
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentSteps, setCurrentSteps] = useState<number>(1);
  const [roleModal, setRoleModal] = useState<boolean>(false);
  const [roleSelected, setRoleSelected] = useState<RolesByUserList>();

  const allowedRoles = useMemo(() => {
    const userInfo = localStorage.getItem('user');
    const user = userInfo ? JSON.parse(userInfo) : null;
    const roleByUserlist =
      user?.role[0].toUpperCase() + user?.role.slice(1).toLowerCase();
    return RoleHelper.getAllowedRoles(roleByUserlist);
  }, [t, user]);

  const translatedRole = (
    role: string | undefined
  ): RolesByUserList | undefined => {
    switch (role) {
      case i18n.t(TRANSLATION.SHARED.DATATABLE.SuperUser):
        return RolesByUserList.SuperUser;
      case i18n.t(TRANSLATION.SHARED.DATATABLE.Admin):
        return RolesByUserList.Admin;
      default:
        return RolesByUserList.Basic;
    }
  };

  const initialValues: Record<string, unknown> = useMemo(() => {
    return {
      username:
        params.username !== 'new-user' ? user.userSelected?.username : '',
      firstName:
        params.username !== 'new-user' ? user.userSelected?.firstName : '',
      lastName:
        params.username !== 'new-user' ? user.userSelected?.lastName : '',
      email: params.username !== 'new-user' ? user.userSelected?.email : '',
      role:
        params.username !== 'new-user'
          ? translatedRole(user.userSelected?.role) || RolesByUserList.Basic
          : RolesByUserList.Basic,
      timeZone:
        params.username !== 'new-user'
          ? user.userSelected?.timeZone ?? DateHelper.getTimeZonesUTC()[0]
          : DateHelper.getTimeZonesUTC()[0],
      enabled:
        params.username !== 'new-user' ? user.userSelected?.enabled : false,
    };
  }, [params.username, user.userSelected]);

  const {
    control,
    reset,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<User>({
    defaultValues: initialValues,
    mode: 'all',
  });

  const handleModal = useCallback(
    (isShowModal: boolean, data?: User) => {
      setShowModal(isShowModal);
      if (data) {
        const {
          username,
          firstName,
          lastName,
          email,
          role,
          timeZone,
          enabled,
        } = data;
        setUserData({
          username,
          firstName,
          lastName,
          email,
          role: role as RolesByUserList,
          timeZone,
          enabled,
        });
        localStorage.removeItem('initialFormValues');
      }
    },
    [setShowModal]
  );

  const handleRoleModal = useCallback(
    (event: string) => {
      const roleSelected =
        RolesByUserList[event as keyof typeof RolesByUserList];
      if (
        roleSelected === RolesByUserList.SuperUser &&
        params.username !== 'new-user'
      ) {
        setRoleModal(true);
      } else {
        setValue('role', roleSelected);
        setRoleSelected(roleSelected);
      }
    },
    [setRoleModal, setValue, params.username]
  );

  const handleRoleSteps = useCallback(() => {
    setValue('role', RolesByUserList.SuperUser);
    setRoleSelected(RolesByUserList.SuperUser);
    setRoleModal(false);
  }, [setRoleModal, setValue, setRoleSelected]);

  const handleRollbackRole = useCallback(() => {
    setRoleModal(false);
  }, [setRoleModal]);

  const loadMethod = useCallback(
    async (page: number, pageSize: number) => {
      if (params.username) {
        if (!store.user.userSelected) {
          await user.loadUserByUsername(params.username);
        }
        await companyProfile.loadAvailablesByUser(params.username, {
          startAtRecord: page,
          recordsPerPage: pageSize,
        });
        await companyProfile.loadAssociatedByUser(params.username, {
          startAtRecord: page,
          recordsPerPage: pageSize,
        });
      }
    },
    [companyProfile, params.username, user]
  );

  const goBack = useCallback(() => {
    localStorage.removeItem('initialFormValues');
    navigate(-1);
  }, [navigate]);

  const loader = useAsyncCall(async () => {
    if (params.username !== 'new-user') {
      await loadMethod(0, recordsPerPage);
    } else {
      await Promise.resolve();
    }
  }, []);

  const handleSteps = useCallback(async () => {
    setShowModal(false);
    if (currentSteps === 1) {
      setCurrentSteps(currentSteps + 1);
      setTextSteps(i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.save));
      if (params.username && params.username === 'new-user' && userData) {
        store.user.userSelected = userData;
        if (userData?.role !== RolesByUserList.SuperUser) {
          await user.createByRole(
            userData.role ?? RolesByUserList.Basic,
            userData
          );
        } else {
          navigate('/administration/user');
          await user.createByRole(RolesByUserList.SuperUser, userData);
        }
      }
    }
    if (params.username && params.username !== 'new-user' && userData) {
      const userUpdated: User = userData;
      if (store.user.userSelected?.username) {
        await user.updateByRole(
          userUpdated.role ?? RolesByUserList.Basic,
          userUpdated,
          store.user.userSelected.username
        );
      }
      navigate('/administration/user');
    }
  }, [currentSteps, navigate, params.username, userData, user]);

  const steps = useMemo(
    () =>
      user?.userSelected?.role !== RolesByUserList.SuperUser ||
      params.username === 'new-user'
        ? [
            {
              title: (
                <Text text={TRANSLATION.SIDEBAR.ADMINISTRATION.createUser} />
              ),
            },
            {
              title: (
                <Text
                  text={
                    TRANSLATION.SIDEBAR.ADMINISTRATION.USER
                      .associateCompanyProfiles
                  }
                />
              ),
            },
          ]
        : [
            {
              title: (
                <Text text={TRANSLATION.SIDEBAR.ADMINISTRATION.createUser} />
              ),
            },
          ],
    [user?.userSelected?.role, params.username, t, TRANSLATION]
  );

  useEffect(() => {
    if (params.username !== 'new-user') {
      setTextButton(ButtonType.UPDATE);
      setTextSteps(i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.save));
    } else {
      setTextSteps(i18n.t(TRANSLATION.SHARED.BUTTON.create));
    }
  }, [params.username, user, t, TRANSLATION]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const formRender = useMemo(() => {
    return (
      <Form control={control}>
        <Row>
          <Col md={4}>
            <label htmlFor="username">
              <Text text={TRANSLATION.SHARED.username} />
            </label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: true,
                minLength: 6,
                maxLength: 100,
                validate: async (value) =>
                  value &&
                  (await ValidatorHelper.validateUsername(
                    value,
                    user.userSelected?.username ?? ''
                  )),
              }}
              // eslint-disable-next-line
              render={({ field }) => (
                <TNSOInput
                  {...field}
                  disabled={!_.isEqual(params.username, 'new-user')}
                />
              )}
            />
            {errors.username && errors.username.type === 'required' && (
              <small className="text-danger">
                <Text text={TRANSLATION.LOGIN.usernameRequired} />
              </small>
            )}
            {errors.username?.type === 'minLength' && (
              <small className="text-danger">
                <Text text={TRANSLATION.LOGIN.usernameMin} />
              </small>
            )}
            {errors.username?.type === 'maxLength' && (
              <small className="text-danger">
                <Text text={TRANSLATION.LOGIN.usernameMax} />
              </small>
            )}
            {errors.username?.type === 'validate' && (
              <small className="text-danger">
                <Text
                  text={
                    TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                      .usernameAlreadyIsUse
                  }
                />
              </small>
            )}
          </Col>
          <Col md={4}>
            <label htmlFor="firstName">
              <Text text={TRANSLATION.LOGIN.firstName} />
            </label>
            {/* eslint-disable-next-line */}
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TNSOInput {...field} />}
            />
            {errors.firstName && (
              <small className="text-danger">
                <Text text={TRANSLATION.LOGIN.firstNameRequired} />
              </small>
            )}
          </Col>
          <Col md={4}>
            <label htmlFor="lastName">
              <Text text={TRANSLATION.LOGIN.lastName} />
            </label>
            {/* eslint-disable-next-line */}
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TNSOInput {...field} />}
            />
            {errors.lastName && (
              <small className="text-danger">
                <Text text={TRANSLATION.LOGIN.lastNameRequired} />
              </small>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <label htmlFor="email">
              <Text text={TRANSLATION.SIDEBAR.ADMINISTRATION.USER.email} />
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
                    user.userSelected?.email ?? ''
                  )),
              }}
              // eslint-disable-next-line
              render={({ field }) => <TNSOInput {...field} />}
            />
            {errors.email?.type === 'required' && (
              <small className="text-danger">
                <Text text={TRANSLATION.LOGIN.emailRequired} />
              </small>
            )}
            {errors.email?.type === 'pattern' && (
              <small className="text-danger">
                <Text text={TRANSLATION.LOGIN.emailMustBeValid} />
              </small>
            )}
            {errors.email?.type === 'validate' && (
              <small className="text-danger">
                <Text
                  text={
                    TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.emailAlreadyInUse
                  }
                />
              </small>
            )}
          </Col>
          <Col md={4}>
            <label htmlFor="role">
              <Text text={TRANSLATION.SIDEBAR.ADMINISTRATION.USER.role} />
            </label>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }): JSX.Element => (
                <TNSOSelector
                  {...field}
                  onChange={(event): void => handleRoleModal(event)}
                  options={allowedRoles.map((role) => ({
                    label: t(role),
                    value: role,
                  }))}
                  className="w-100"
                />
              )}
            />
            {errors.role && (
              <small className="text-danger">
              <Text text={TRANSLATION.SIDEBAR.ADMINISTRATION.USER.roleRequired} />
              </small>
            )}
          </Col>
          <Col md={4}>
            <label htmlFor="timeZone">
              <Text text={TRANSLATION.SIDEBAR.ADMINISTRATION.USER.timeZone} />
            </label>
            <Controller
              name="timeZone"
              control={control}
              // eslint-disable-next-line
              render={({ field }) => (
                <TNSOSelector
                  {...field} /* eslint-disable react/jsx-no-bind */
                  options={DateHelper.getTimeZonesUTC().map((timeZone) => ({
                    label: timeZone,
                    value: timeZone,
                  }))}
                  className="w-100"
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mt-1 d-flex gap-2">
            <label htmlFor="enabled">
              <Text text={TRANSLATION.SIDEBAR.ADMINISTRATION.USER.true} />
            </label>
            <Controller
              name="enabled"
              control={control}
              // eslint-disable-next-line
              render={({ field }) => (
                <Checkbox {...field} checked={field.value} />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={{ span: 1, offset: 11 }}
            className="d-flex justify-content-end"
          >
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <TNSOButton
              variant={Variants.Primary}
              onClick={(): void => handleModal(true, getValues())}
              disabled={!isValid}
            >
              {textSteps}
            </TNSOButton>
          </Col>
        </Row>
      </Form>
    );
  }, [
    allowedRoles,
    control,
    errors.email?.type,
    errors.firstName?.type,
    errors.lastName?.type,
    errors.role?.type,
    errors.username?.type,
    getValues,
    handleModal,
    handleRoleModal,
    isValid,
    roleSelected,
    t,
    TRANSLATION,
    user.userSelected?.email,
    user.userSelected?.role,
  ]);

  return loader.completed ? (
    <Container fluid>
      <Row className="my-4">
        <Col md="auto">
          <TNSOButton variant={Variants.Secondary} onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </TNSOButton>
        </Col>
        <Col className="m-auto">
          <h3 className="um-title mb-0">
            <Text text={TRANSLATION.SIDEBAR.ADMINISTRATION.USER.userProfileAdministration} />
          </h3>
        </Col>
      </Row>
      {params.username === 'new-user' && (
        <Steps
          current={currentSteps - 1}
          className="steps w-75"
          items={steps}
        />
      )}
      {(currentSteps === 1 || params.username !== 'new-user') && (
        <TNSOCard className="my-3">{formRender}</TNSOCard>
      )}
      {(currentSteps === 2 ||
        (params.username !== 'new-user' &&
          user.userSelected?.role !== RolesByUserList.SuperUser)) && (
        <TransferList
          availablesData={companyProfile?.availableData?.companyProfiles}
          associatedData={companyProfile?.associatedData?.companyProfiles}
          availableTitle={i18n.t(
            TRANSLATION.SIDEBAR.ADMINISTRATION.USER.availableCompanyProfiles
          )}
          associateTitle={i18n.t(
            TRANSLATION.SIDEBAR.ADMINISTRATION.USER.associatedCompanyProfiles
          )}
          typeData="companyProfile"
          availableTotal={companyProfile?.availableData?.totalRecords ?? 0}
          associatedTotal={companyProfile?.associatedData?.totalRecords ?? 0}
          data={userData}
          associatedDataLength={
            store.user.userSelected?.companyProfiles?.length ?? 0
          }
          canBeEdited={true}
        />
      )}
      <ModalComponent
        showModal={showModal}
        handleClose={handleModal}
        title={i18n.t(
          TRANSLATION.SHARED.BUTTON[
            textButton as keyof typeof TRANSLATION.SHARED.BUTTON
          ]
        )}
        buttonCancel={i18n.t(TRANSLATION.SHARED.BUTTON.cancel)}
        buttonSubmit={i18n.t(
          TRANSLATION.SHARED.BUTTON[
            textButton as keyof typeof TRANSLATION.SHARED.BUTTON
          ]
        )}
        handleSubmit={(): Promise<void> => handleSteps()}
      >
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        {i18n.t(
          TRANSLATION.SIDEBAR.ADMINISTRATION.USER[
            `${textButton}User` as keyof typeof TRANSLATION.SIDEBAR.ADMINISTRATION.USER
          ]
        )}
      </ModalComponent>
      <ModalComponent
        showModal={roleModal}
        handleClose={handleRollbackRole}
        title={i18n.t(TRANSLATION.MODAL.ALERT.switchingUserRole)}
        buttonCancel={i18n.t(TRANSLATION.SHARED.BUTTON.cancel)}
        buttonSubmit={i18n.t(TRANSLATION.SHARED.BUTTON.accept)}
        handleSubmit={handleRoleSteps}
      >
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        {i18n.t(TRANSLATION.MODAL.ALERT.switching)}
      </ModalComponent>
    </Container>
  ) : null;
};

// to get allowed roles for routes, use the route name from Router.tsx
const AssociateCompanyProfiles = withAuthorization(
  observer(AssociateCompanyProfilesInternal),
  AuthHelper.getAllowedRolesForRoute('profileAdministration')
);

export default AssociateCompanyProfiles;
