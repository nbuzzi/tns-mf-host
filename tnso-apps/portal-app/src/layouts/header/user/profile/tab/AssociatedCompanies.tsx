import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { UserAssociatedCompanyTable } from '../../../../../interfaces/companyProfiles/company';
import { columns } from '../../../../../store/user/tableConfig';
import { TRANSLATION } from '../../../../../utils/const/translation';
import { useTranslation } from 'react-i18next';
import { TNSOGrid } from '@tnso/ui-components/dist';
import { TranslationHelper } from '../../../../../helpers/shared/TranslationHelper';
import { ColumnsType } from 'antd/lib/table';

interface Props {
  items: UserAssociatedCompanyTable[] | undefined;
  isSuperUser: boolean;
}
export const AssociatedCompaniesTable: React.FC<Props> = ({
  items,
  isSuperUser,
}) => {
  const { t } = useTranslation();
  const emptyMessage = useMemo(() => {
    return isSuperUser
      ? t(TRANSLATION.SHARED.USERPROFILE.superUserHasAccess)
      : t(TRANSLATION.SHARED.USERPROFILE.thereAreNoAssociatedCompanies);
  }, [isSuperUser, t]);

  const dataTable = useMemo(() => {
    return (
      items?.map((item, index) => ({ key: item.name + index, ...item })) ?? []
    );
  }, [items]);

  const grid = useMemo(() => {
    return (
      <TNSOGrid
        dataSource={dataTable}
        columns={TranslationHelper.columnsTranslation(
          columns.companiesByUser as unknown as ColumnsType[]
        )}
        emptyMessage={emptyMessage}
        showPagination={true}
      />
    );
  }, [items, emptyMessage, dataTable]);

  return (
    <Container fluid className="w-100">
      <span className="h4">
        {t(TRANSLATION.SHARED.USERPROFILE.associateCompanies)}
      </span>
      {grid}
    </Container>
  );
};
