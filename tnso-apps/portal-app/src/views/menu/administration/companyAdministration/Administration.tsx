/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAsyncCall } from '../../../../hooks/useAsyncCallShared';
import { Steps } from 'antd';
import { store } from '../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';
import withAuthorization from '../../../../HOC/withAuthorization';
import { AuthHelper } from '../../../../helpers/auth/AuthHelper';
import TransferList from '../../../../components/transferList/TransferList';
import {
  CompanyProfile,
  CompanyProfileWithACNAs,
} from '../../../../interfaces/companyProfiles/company';
import ModalComponent from '../../../../components/shared/modal/ModalComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { TRANSLATION } from '../../../../utils/const/translation';
import { Controller, useForm } from 'react-hook-form';
import {
  TNSOInput,
  TNSOTextarea,
  TNSOCard,
  TNSOButton,
  Variants,
} from '@tnso/ui-components/dist';
import _ from 'lodash';
import { ValidatorHelper } from '../../../../helpers/shared/ValidatorHelper';
import { Roles } from '../../../../interfaces/auth/roleAndPermission/role';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

export enum TextModal {
  create = 'create',
  save = 'save',
}

const AdministrationInternal: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<CompanyProfileWithACNAs>();
  const [textButton, setTextButton] = useState<TextModal>(TextModal.create);
  const [textSteps, setTextSteps] = useState<string>(
    i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.next)
  );
  const [currentSteps, setCurrentSteps] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const userInfo = localStorage.getItem('user');
  const user = userInfo ? JSON.parse(userInfo) : null;

  const initialValues: CompanyProfileWithACNAs = useMemo(() => {
    return {
      name: store.companyProfile.companyProfile?.name ?? '',
      note: store.companyProfile.companyProfile?.note ?? '',
      canBeDeleted: store.companyProfile.companyProfile?.canBeDeleted ?? true,
      canBeEdited: store.companyProfile.companyProfile?.canBeEdited ?? true,
    };
  }, [store.companyProfile.companyProfile]);
  const canBeEdited = useMemo(
    () =>
      initialValues.canBeEdited ||
      store.auth.userInfo?.role === Roles.SuperUser,
    [initialValues.canBeEdited, store.auth.userInfo?.role]
  );

  const {
    getValues,
    watch,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
  });

  const recordsPerPage = 10;
  const maxNoteLength = 500;

  useEffect(() => {
    setTextSteps(i18n.t(TRANSLATION.SIDEBAR.ADMINISTRATION.next));
  }, [t, TRANSLATION]);

  const loadMethod = useCallback(
    async (page: number, pageSize: number) => {
      if (
        params.companyProfile &&
        params.companyProfile !== 'new-company-profile'
      ) {
        if (!store.companyProfile.companyProfile) {
          await store.companyProfile.loadDataByName(params.companyProfile);
        }
        await store.acna.loadAvailablesByCompanyProfile(params.companyProfile, {
          startAtRecord: page,
          recordsPerPage: pageSize,
        });
        await store.acna.loadAssociatedByCompanyProfile(params.companyProfile, {
          startAtRecord: page,
          recordsPerPage: pageSize,
        });
      }
    },
    [params.companyProfile]
  );

  const handleModal = useCallback(
    (isShowModal: boolean, data?: CompanyProfileWithACNAs) => {
      setShowModal(isShowModal);
      if (data) {
        const { name, acnas, note, canBeDeleted } = data;
        setCompanyData({ name, acnas, note, canBeDeleted });
      }
    },
    []
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const loader = useAsyncCall(async () => {
    await loadMethod(0, recordsPerPage);
  }, []);

  const handleSteps = useCallback(async () => {
    setShowModal(false);
    if (currentSteps === 1) {
      setCurrentSteps(currentSteps + 1);
      setTextSteps(i18n.t(TRANSLATION.SHARED.BUTTON.save));
      if (
        params.companyProfile &&
        params.companyProfile === 'new-company-profile' &&
        companyData
      ) {
        delete companyData.canBeDeleted;
        const newCompany = { ...companyData, acnas: '' };
        store.companyProfile.setData(newCompany);
        await store.companyProfile.create(newCompany);
        return;
      }
    }
    if (
      params.companyProfile &&
      params.companyProfile !== 'new-company-profile' &&
      companyData
    ) {
      delete companyData.acnas;
      delete companyData.canBeDeleted;
      const updateCompany = { ...companyData } as CompanyProfile;
      await store.companyProfile.update(params.companyProfile, updateCompany);
      navigate('/administration/company');
      return;
    }
  }, [currentSteps, companyData, navigate, params.companyProfile]);

  const steps = useMemo(
    () => [
      {
        title: (
          <Text
            text={TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.companyProfile}
          />
        ),
      },
      {
        title: (
          <Text
            text={TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.associateACNAs}
          />
        ),
      },
    ],
    [t, TRANSLATION]
  );

  useEffect(() => {
    if (
      params.companyProfile &&
      params.companyProfile !== 'new-company-profile'
    ) {
      setTextSteps(i18n.t(TRANSLATION.SHARED.BUTTON.save));
      setTextButton(TextModal.save);
    }
  }, [params.companyProfile, t, TRANSLATION]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return loader.completed ? (
    <Container fluid id="configuration-view" className="configuration-view">
      <Row className="mt-3 mb-2 sjustify-content-center align-items-center">
        {(currentSteps === 1 ||
          currentSteps === 2 ||
          params.companyProfile !== 'new-company-profile') && (
          <Col md="auto">
            <TNSOButton variant={Variants.Secondary} onClick={goBack}>
              <FontAwesomeIcon icon={faChevronLeft} size="sm" />
            </TNSOButton>
          </Col>
        )}
        <Col>
          <Card.Title className="um-title p-0">
            <Text
              text={t(
                TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                  .companyProfileAdministration
              )}
            />
          </Card.Title>
        </Col>
      </Row>
      {params.companyProfile === 'new-company-profile' && (
        <Steps
          current={currentSteps - 1}
          className="steps w-75"
          items={steps}
        />
      )}
      {(currentSteps === 1 ||
        params.companyProfile !== 'new-company-profile') && (
        <TNSOCard className="my-3">
          <Row className="mt-4">
            <Col md={5}>
              <Row className="align-items-center">
                <Col md={4}>
                  <label htmlFor="name">
                    <Text
                      text={t(
                        TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                          .companyProfileName
                      )}
                    />
                  </label>
                </Col>
                <Col md={5}>
                  {/* eslint-disable-next-line */}
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: true,
                      validate: async (value) =>
                        ValidatorHelper.validateCompanyName(
                          value,
                          params.companyProfile ?? ''
                        ),
                    }}
                    // eslint-disable-next-line
                    render={({ field }) => <TNSOInput {...field} />}
                  />
                  {errors.name?.type === 'required' && (
                    <small className="text-danger">
                      {t(
                        TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                          .nameIsRequired
                      )}
                    </small>
                  )}
                  {errors.name?.type === 'validate' && (
                    <small className="text-danger">
                      <Text
                        text={t(
                          TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
                            .companyNameIsAlreadyTaken
                        )}
                      />
                    </small>
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col md="auto">
                  <label htmlFor="note">
                    <Text
                      text={t(TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.notes)}
                    />
                  </label>
                </Col>
                <Col md={10}>
                  <Controller
                    name="note"
                    control={control}
                    // eslint-disable-next-line
                    render={({ field }): any => (
                      <TNSOTextarea
                        {...field}
                        name="note"
                        placeholder={i18n.t(TRANSLATION.SHARED.placeholderNote)}
                        rows={8}
                        maxLength={maxNoteLength}
                        style={{ resize: 'none' }}
                        disabled={!initialValues.canBeEdited}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col
              md={{ span: 2, offset: 10 }}
              className="d-flex justify-content-end"
            >
              {/* eslint-disable-next-line react/jsx-no-bind */}
              <TNSOButton
                variant={Variants.Primary}
                onClick={(): void => handleModal(true, getValues())}
                disabled={!isValid || !canBeEdited}
              >
                {textSteps}
              </TNSOButton>
            </Col>
          </Row>
        </TNSOCard>
      )}
      {(currentSteps === 2 ||
        params.companyProfile !== 'new-company-profile') && (
        <TransferList
          availablesData={store?.acna?.availableData?.acnas}
          associatedData={store?.acna?.associatedData?.acnas}
          availableTitle={i18n.t(
            TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.availableAcna
          )}
          associateTitle={i18n.t(
            TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY.associateAcna
          )}
          typeData="acna"
          availableTotal={store?.acna?.availableData?.totalRecords ?? 0}
          associatedTotal={store?.acna?.associatedData?.totalRecords ?? 0}
          data={companyData}
          associatedDataLength={
            store?.companyProfile.companyProfile?.acnas?.length ?? 0
          }
          canBeEdited={canBeEdited}
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
          TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY[
            `${textButton}CompanyProfile` as keyof typeof TRANSLATION.SIDEBAR.ADMINISTRATION.COMPANY
          ]
        )}
      </ModalComponent>
    </Container>
  ) : null;
};

// to get allowed roles for routes, use the route name from Router.tsx
const Administration = withAuthorization(
  observer(AdministrationInternal),
  AuthHelper.getAllowedRolesForRoute('companyProfiles')
);

export default Administration;
