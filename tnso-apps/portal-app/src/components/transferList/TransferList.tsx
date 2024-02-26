import React, {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Pagination, PaginationProps } from 'antd';
import {
  TNSOCard,
  TNSOSearch,
  TNSOButton,
  Variants,
} from '@tnso/ui-components/dist';
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';

import { store } from '../../store/StoreMobx';
import { ACNA } from '../../interfaces/companyProfiles/acna/acna';
import {
  CompanyProfile,
  CompanyProfileWithACNAs,
} from '../../interfaces/companyProfiles/company';
import { BoxTable } from '../shared/table/BoxTable';
import { useParams } from 'react-router-dom';
import { RolesByUserList } from '../../interfaces/auth/roleAndPermission/role';
import { User } from '../../interfaces/users/user';
import { TRANSLATION } from '../../utils/const/translation';

export interface TransferListProps {
  availablesData?: ACNA[] | CompanyProfileWithACNAs[];
  availableTotal: number;
  associatedTotal: number;
  associatedData?: ACNA[] | CompanyProfileWithACNAs[];
  availableTitle?: string;
  associateTitle?: string;
  isEdit?: boolean;
  typeData?: 'acna' | 'companyProfile';
  data?: CompanyProfileWithACNAs | User;
  associatedDataLength: number;
  canBeEdited?: boolean;
}

export enum TypeList {
  available = 'available',
  associated = 'associated',
}

const TransferList: React.FC<TransferListProps> = ({
  availablesData,
  associatedData,
  availableTitle,
  associateTitle,
  isEdit,
  typeData,
  availableTotal,
  associatedTotal,
  data,
  associatedDataLength,
  canBeEdited,
}) => {
  const { acna } = store;
  const { t } = useTranslation();
  const { companyProfile, username } = useParams();

  const [availableItems, setAvailableItems] = React.useState<
    ACNA[] | CompanyProfileWithACNAs[] | CompanyProfile[]
  >([]);
  const [associateItems, setAssociateItems] = React.useState<
    ACNA[] | CompanyProfileWithACNAs[] | CompanyProfile[]
  >([]);
  const [selectedItem, setSelectedItem] = React.useState<
    ACNA | CompanyProfileWithACNAs | CompanyProfile
  >();
  const [selectedAvailable, setSelectedAvailable] =
    React.useState<boolean>(false);
  const [selectedAssociate, setSelectedAssociate] =
    React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentAssociatePage, setCurrentAssociatePage] =
    React.useState<number>(1);
  const [searchAvailable, setSearchAvailable] = React.useState<string>('');
  const [searchAssociate, setSearchAssociate] = React.useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectItem = useRef<any>(null);
  const recordsPerPage = 10;

  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement
  ): ReactNode => {
    if (type === 'prev') {
      return (
        <span className="legend-pagination">
          <FontAwesomeIcon icon={faChevronLeft} size="1x" />
        </span>
      );
    }
    if (type === 'next') {
      return (
        <span className="legend-pagination">
          <FontAwesomeIcon icon={faChevronRight} size="1x" />
        </span>
      );
    }
    return originalElement;
  };

  const validationDisabledRight = useMemo(
    () => !selectedAvailable || !canBeEdited,
    [selectedAvailable, canBeEdited]
  );
  const validationDisabledLeft = useMemo(
    () => !selectedAssociate || associatedDataLength < 2 || !canBeEdited,
    [selectedAssociate, associatedDataLength, canBeEdited]
  );

  const handleChangePageToAvailableList = useCallback(
    async (page: number): Promise<void> => {
      setCurrentPage(page);
      const startAtRecord = (page - 1) * recordsPerPage;
      if (typeData === 'acna' && companyProfile) {
        const companySelected = data as CompanyProfileWithACNAs | undefined;
        const companyProfileName = companySelected
          ? companySelected.name
          : companyProfile;
        await acna.loadAvailablesByCompanyProfile(companyProfileName, {
          name: searchAvailable,
          startAtRecord,
          recordsPerPage,
        });
      } else if (typeData === 'companyProfile' && username) {
        const userSelected = data as User;
        const usernameSelected =
          userSelected && userSelected.username
            ? userSelected.username
            : username;
        await store.companyProfile.loadAvailablesByUser(usernameSelected, {
          name: searchAvailable,
          startAtRecord,
          recordsPerPage,
        });
      }
    },
    [acna, typeData, companyProfile, username, data, searchAvailable]
  );

  const handleChangePageToAssociateList = useCallback(
    async (page: number): Promise<void> => {
      setCurrentAssociatePage(page);
      const startAtRecord = (page - 1) * recordsPerPage;
      if (typeData === 'acna' && companyProfile) {
        const companySelected = data as CompanyProfileWithACNAs | undefined;
        const companyProfileName = companySelected
          ? companySelected.name
          : companyProfile;
        await acna.loadAssociatedByCompanyProfile(companyProfileName, {
          name: searchAssociate,
          startAtRecord,
          recordsPerPage,
        });
      } else if (typeData === 'companyProfile' && username) {
        const userSelected = data as User;
        const usernameSelected =
          userSelected && userSelected.username
            ? userSelected.username
            : username;
        await store.companyProfile.loadAssociatedByUser(usernameSelected, {
          name: searchAssociate,
          startAtRecord,
          recordsPerPage,
        });
      }
    },
    [acna, typeData, companyProfile, username, data, searchAssociate]
  );

  const handleSearch = useCallback(
    async (e: FormEvent<HTMLElement>, typelist: TypeList) => {
      const { value } = e.target as HTMLInputElement;
      if (typeData === 'acna') {
        const companySelected = data as CompanyProfileWithACNAs | undefined;
        const companyProfileName = companySelected
          ? companySelected.name
          : companyProfile;
        if (typelist === TypeList.available) {
          setSearchAvailable(value);
          await acna.loadAvailablesByCompanyProfile(companyProfileName ?? '', {
            name: value,
            startAtRecord: 0,
            recordsPerPage,
          });
          setCurrentPage(1);
        } else {
          setSearchAssociate(value);
          await acna.loadAssociatedByCompanyProfile(companyProfileName ?? '', {
            name: value,
            startAtRecord: 0,
            recordsPerPage,
          });
          setCurrentAssociatePage(1);
        }
      } else {
        const userSelected = data as User;
        const usernameSelected =
          userSelected && userSelected.username
            ? userSelected.username
            : username;
        if (typelist === TypeList.available) {
          setSearchAvailable(value);
          await store.companyProfile.loadAvailablesByUser(
            usernameSelected ?? '',
            { name: value, startAtRecord: 0, recordsPerPage }
          );
          setCurrentPage(1);
        } else {
          setSearchAssociate(value);
          await store.companyProfile.loadAssociatedByUser(
            usernameSelected ?? '',
            { name: value, startAtRecord: 0, recordsPerPage }
          );
          setCurrentAssociatePage(1);
        }
      }
    },
    [acna, typeData, companyProfile, username, data]
  );

  const handleselectedItem = useCallback(
    (
      item: ACNA | CompanyProfile | CompanyProfileWithACNAs,
      id: string,
      type: TypeList
    ) => {
      if (selectedItem) {
        selectItem.current?.classList.remove('td-active');
      }

      const element = document.getElementById(id);
      if (element) {
        selectItem.current = element;
        selectItem.current?.classList.add('td-active');
      }
      setSelectedItem(item);
      if (type === TypeList.available) {
        setSelectedAvailable(true);
        setSelectedAssociate(false);
      } else {
        setSelectedAvailable(false);
        setSelectedAssociate(true);
      }
    },
    [selectedItem]
  );

  const returnedItems = useCallback(
    (
      item: ACNA | CompanyProfileWithACNAs | CompanyProfile,
      typeData?: string
    ) => {
      if (typeData === 'acna') {
        const acna = item as ACNA;
        return `${acna.name} - ${acna.knownAs}`;
      } else {
        const companyProfile = item as CompanyProfileWithACNAs;
        return `${companyProfile.name}`;
      }
    },
    []
  );

  const transferAvailableToAssociate = useCallback(async () => {
    if (selectedItem) {
      if (typeData === 'companyProfile') {
        const companyProfiles = store.user.userSelected
          ?.companyProfiles as string[];
        const companyProfilesArray = companyProfiles ?? [];
        const companyList = companyProfilesArray.map((item) => ({
          name: item,
        })) as CompanyProfile[];
        companyList.push(selectedItem as CompanyProfile);
        if (store.user?.userSelected) {
          store.user.userSelected.companyProfiles = companyList.map(
            (item) => item.name
          );
          const updatedUser = {
            ...store.user.userSelected,
            companyProfiles: store.user.userSelected.companyProfiles.join(','),
          };
          await store.user.updateByRole(
            store.user.userSelected.role || RolesByUserList.Basic,
            updatedUser,
            store.user.userSelected.username || ''
          );
          let startAtRecord;
          if (availablesData && availablesData.length < 2 && currentPage > 1) {
            startAtRecord =
              (currentPage - 2) * recordsPerPage > 0
                ? (currentPage - 2) * recordsPerPage
                : 0;
            setCurrentPage(currentPage - 1);
          } else {
            startAtRecord =
              (currentPage - 1) * recordsPerPage > 0
                ? (currentPage - 1) * recordsPerPage
                : 0;
          }
          const startAtRecordToAssociateList =
            (currentAssociatePage - 1) * recordsPerPage;
          const nameFilter =
            availablesData && availablesData.length < 2 && currentPage === 1
              ? ''
              : searchAvailable;
          setSearchAvailable(nameFilter);
          await store.companyProfile.loadAvailablesByUser(
            store.user.userSelected.username ?? '',
            { name: nameFilter, startAtRecord, recordsPerPage }
          );
          await store.companyProfile.loadAssociatedByUser(
            store.user.userSelected.username ?? '',
            {
              name: searchAssociate,
              startAtRecord: startAtRecordToAssociateList,
              recordsPerPage,
            }
          );
        }
      } else {
        const acnas = store.companyProfile?.companyProfile?.acnas || [];
        acnas.push(selectedItem as ACNA);
        if (store.companyProfile?.companyProfile) {
          store.companyProfile.companyProfile.acnas = acnas;
          const updatedAcnas = store.companyProfile.companyProfile.acnas
            .map((acna) => acna.name)
            .join(',');
          const companyProfile: CompanyProfile = {
            ...store.companyProfile.companyProfile,
            acnas: updatedAcnas,
          };
          await store.companyProfile.update(
            store.companyProfile.companyProfile.name,
            companyProfile
          );
          let startAtRecord;
          if (availablesData && availablesData.length < 2 && currentPage > 1) {
            startAtRecord =
              (currentPage - 2) * recordsPerPage > 0
                ? (currentPage - 2) * recordsPerPage
                : 0;
            setCurrentPage(currentPage - 1);
          } else {
            startAtRecord =
              (currentPage - 1) * recordsPerPage > 0
                ? (currentPage - 1) * recordsPerPage
                : 0;
          }
          const startAtRecordToAssociateList =
            (currentAssociatePage - 1) * recordsPerPage;
          const nameFilter =
            availablesData && availablesData.length < 2 && currentPage === 1
              ? ''
              : searchAvailable;
          setSearchAvailable(nameFilter);
          await store.acna.loadAvailablesByCompanyProfile(
            store.companyProfile.companyProfile.name,
            { name: nameFilter, startAtRecord, recordsPerPage }
          );
          await store.acna.loadAssociatedByCompanyProfile(
            store.companyProfile.companyProfile.name,
            {
              name: searchAssociate,
              startAtRecord: startAtRecordToAssociateList,
              recordsPerPage,
            }
          );
        }
      }
      if (selectedItem) {
        selectItem.current?.classList.remove('td-active');
      }
      setSelectedAvailable(false);
      setSelectedAssociate(false);
    }
  }, [selectedItem, typeData, currentPage, currentAssociatePage]);

  const transferAssociateToAvailable = useCallback(async () => {
    if (selectedItem) {
      if (typeData === 'companyProfile') {
        const companyProfiles = store.user.userSelected
          ?.companyProfiles as string[];
        const companyProfilesArray = companyProfiles ?? [];
        const companyList = companyProfilesArray.map((item) => ({
          name: item,
        })) as CompanyProfile[];
        const updatedCompany = companyList.filter(
          (item) => item.name !== (selectedItem as CompanyProfile).name
        );
        if (store.user?.userSelected) {
          store.user.userSelected.companyProfiles = updatedCompany.map(
            (item) => item.name
          );
          const updatedUser = {
            ...store.user.userSelected,
            companyProfiles: store.user.userSelected.companyProfiles.join(','),
          };
          await store.user.updateByRole(
            store.user.userSelected.role ?? RolesByUserList.Basic,
            updatedUser,
            store.user.userSelected.username ?? ''
          );
          const current = (currentPage - 1) * recordsPerPage;
          const startAtRecord =
            current > 0 ? (currentPage - 1) * recordsPerPage : 0;
          let startAtRecordToAssociateList;
          if (
            associatedData &&
            associatedData.length < 2 &&
            currentAssociatePage > 0
          ) {
            startAtRecordToAssociateList =
              (currentAssociatePage - 2) * recordsPerPage > 0
                ? (currentAssociatePage - 2) * recordsPerPage
                : 0;
            setCurrentAssociatePage(currentAssociatePage - 1);
          } else {
            startAtRecordToAssociateList =
              (currentAssociatePage - 1) * recordsPerPage > 0
                ? (currentAssociatePage - 1) * recordsPerPage
                : 0;
          }
          const nameFilter =
            associatedData &&
            associatedData.length < 2 &&
            currentAssociatePage === 1
              ? ''
              : searchAssociate;
          setSearchAssociate(nameFilter);
          await store.companyProfile.loadAvailablesByUser(
            store.user.userSelected.username ?? '',
            { name: searchAvailable, startAtRecord, recordsPerPage }
          );
          await store.companyProfile.loadAssociatedByUser(
            store.user.userSelected.username ?? '',
            {
              name: nameFilter,
              startAtRecord: startAtRecordToAssociateList,
              recordsPerPage,
            }
          );
        }
      } else {
        const acnas = store.companyProfile?.companyProfile?.acnas ?? [];
        const updatedList = acnas.filter(
          (item) => item.name !== (selectedItem as ACNA).name
        );
        if (store.companyProfile?.companyProfile) {
          store.companyProfile.companyProfile.acnas = updatedList;
          const updatedAcnas = store.companyProfile.companyProfile.acnas
            .map((acna) => acna.name)
            .join(',');
          const companyProfile: CompanyProfile = {
            ...store.companyProfile.companyProfile,
            acnas: updatedAcnas,
          };
          await store.companyProfile.update(
            store.companyProfile.companyProfile.name,
            companyProfile
          );
          const current = (currentPage - 1) * recordsPerPage;
          const startAtRecord =
            current > 0 ? (currentPage - 1) * recordsPerPage : 0;
          let startAtRecordToAssociateList;
          if (
            associatedData &&
            associatedData.length < 2 &&
            currentAssociatePage > 0
          ) {
            startAtRecordToAssociateList =
              (currentAssociatePage - 2) * recordsPerPage > 0
                ? (currentAssociatePage - 2) * recordsPerPage
                : 0;
            setCurrentAssociatePage(currentAssociatePage - 1);
          } else {
            startAtRecordToAssociateList =
              (currentAssociatePage - 1) * recordsPerPage > 0
                ? (currentAssociatePage - 1) * recordsPerPage
                : 0;
          }
          const nameFilter =
            associatedData &&
            associatedData.length < 2 &&
            currentAssociatePage === 1
              ? ''
              : searchAssociate;
          setSearchAssociate(nameFilter);
          await store.acna.loadAvailablesByCompanyProfile(
            store.companyProfile.companyProfile.name,
            { name: searchAvailable, startAtRecord, recordsPerPage }
          );
          await store.acna.loadAssociatedByCompanyProfile(
            store.companyProfile.companyProfile.name,
            {
              name: nameFilter,
              startAtRecord: startAtRecordToAssociateList,
              recordsPerPage,
            }
          );
        }
      }
      if (selectedItem) {
        selectItem.current?.classList.remove('td-active');
      }
      setSelectedAvailable(false);
      setSelectedAssociate(false);
    }
  }, [selectedItem, typeData, currentPage, currentAssociatePage]);

  const renderedAvailableItems = useMemo(
    () =>
      availableItems.map(
        (item, index): JSX.Element => (
          // eslint-disable-next-line react/jsx-no-bind
          <tr
            key={`${index}-${item}`}
            onClick={(): void =>
              handleselectedItem(
                item,
                `${index}-${item.name}`,
                TypeList.available
              )
            }
            className="body-table"
          >
            <td
              style={{ paddingLeft: '1.5rem' }}
              id={`${index}-${item.name}`}
              className="td"
            >
              {returnedItems(item, typeData)}
            </td>
            {isEdit && (
              <td>
                <Button variant="outline-primary">
                  <FontAwesomeIcon icon={faEdit} size="1x" />
                </Button>
              </td>
            )}
          </tr>
        )
      ),
    [availableItems, handleselectedItem, isEdit, returnedItems, typeData]
  );

  const renderedAssociateItems = useMemo(
    () =>
      associateItems.map(
        (item, index): JSX.Element => (
          // eslint-disable-next-line react/jsx-no-bind
          <tr
            key={`${index}-${item}`}
            onClick={(): void =>
              handleselectedItem(
                item,
                `${index}-${item.name}`,
                TypeList.associated
              )
            }
            className="body-table"
          >
            <td
              style={{ paddingLeft: '1.5rem' }}
              id={`${index}-${item.name}`}
              className="td"
            >
              {returnedItems(item, typeData)}
            </td>
            {isEdit && (
              <td>
                <Button variant="outline-primary">
                  <FontAwesomeIcon icon={faEdit} size="1x" />
                </Button>
              </td>
            )}
          </tr>
        )
      ),
    [associateItems, handleselectedItem, isEdit, returnedItems, typeData]
  );

  useEffect(() => {
    if (availablesData && availablesData.length > 0) {
      setAvailableItems(availablesData);
    } else {
      setAvailableItems([]);
    }
  }, [availablesData]);

  useEffect(() => {
    if (associatedData && associatedData.length > 0) {
      setAssociateItems(associatedData);
    } else {
      setAssociateItems([]);
    }
  }, [associatedData]);

  return (
    <TNSOCard className="transfer-card" data-testid="transfer-list-component">
      <Row>
        <Col md={5}>
          <p style={{ lineHeight: '20px', paddingLeft: '1.5rem' }}>
            {availableTitle}
          </p>
          <BoxTable>
            <Table className="table-hover">
              <thead>
                <tr>
                  <th>
                    <TNSOSearch
                      placeholder={t(TRANSLATION.SHARED.search)}
                      // eslint-disable-next-line react/jsx-no-bind
                      onChange={(e): Promise<void> =>
                        handleSearch(e, TypeList.available)
                      }
                      value={searchAvailable}
                    />
                  </th>
                  {isEdit && <th />}
                </tr>
              </thead>
              <tbody>{renderedAvailableItems}</tbody>
              <tfoot>
                <tr>
                  {availableTotal > 0 && (
                    <td>
                      {/* eslint-disable-next-line react/jsx-no-bind */}
                      <Pagination
                        total={availableTotal ?? 0}
                        itemRender={itemRender}
                        onChange={handleChangePageToAvailableList}
                        current={currentPage}
                      />
                    </td>
                  )}
                  {isEdit && <td />}
                </tr>
              </tfoot>
            </Table>
          </BoxTable>
        </Col>
        <Col
          md={2}
          className="d-flex flex-column gap-3 justify-content-center align-items-center"
        >
          <Row className="mb-4">
            <TNSOButton
              variant={Variants.Primary}
              onClick={transferAvailableToAssociate}
              disabled={validationDisabledRight}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </TNSOButton>
          </Row>
          <Row>
            <TNSOButton
              variant={Variants.Primary}
              onClick={transferAssociateToAvailable}
              disabled={validationDisabledLeft}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </TNSOButton>
          </Row>
        </Col>
        <Col md={5}>
          <p style={{ lineHeight: '20px', paddingLeft: '1.5rem' }}>
            {associateTitle}
          </p>
          <BoxTable>
            <Table>
              <thead>
                <tr>
                  <th>
                    <TNSOSearch
                      placeholder={t(TRANSLATION.SHARED.search)}
                      // eslint-disable-next-line react/jsx-no-bind
                      onChange={(e): Promise<void> =>
                        handleSearch(e, TypeList.associated)
                      }
                      value={searchAssociate}
                    />
                  </th>
                  {isEdit && <th />}
                </tr>
              </thead>
              <tbody>{renderedAssociateItems}</tbody>
              <tfoot>
                <tr>
                  {associatedTotal > 0 && (
                    <td>
                      {/* eslint-disable-next-line react/jsx-no-bind */}
                      <Pagination
                        total={associatedTotal ?? 0}
                        itemRender={itemRender}
                        onChange={handleChangePageToAssociateList}
                        current={currentAssociatePage}
                      />
                    </td>
                  )}
                  {isEdit && <td />}
                </tr>
              </tfoot>
            </Table>
          </BoxTable>
        </Col>
      </Row>
    </TNSOCard>
  );
};

export default observer(TransferList);
