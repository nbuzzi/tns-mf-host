import React, { ReactNode } from 'react';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { store } from '../StoreMobx';
import _ from 'lodash';
import { CompanyProfile } from '../../interfaces/companyProfiles/company';
import { TRANSLATION } from '../../utils/const/translation';
import { i18nInstance } from '../../i18n';
import { TNSOSearchGrid } from '../../components/shared/table/SearchFilter';

// eslint-disable-next-line
const getColumnSearchProps = (dataIndex: string, icon?: ReactNode): any => ({
  // eslint-disable-next-line
  filterDropdown: (props: any) => (
    <TNSOSearchGrid
      themeSelected="dark"
      onSearch={handleSearch}
      keyFilter={dataIndex}
      onReset={() => handleSearch('all', dataIndex)}
    />
  ),
  filterIcon: () => icon ?? <SearchOutlined />,
});

const companies = [
  {
    dataIndex: 'canBeDeleted',
    title: 'action',
    key: 'canBeDeleted',
    ellipsis: true,
    width: 150,
    render: (value: string, data: CompanyProfile): JSX.Element => {
      const disabled = _.isEqual(
        i18nInstance.t(TRANSLATION.SHARED.DATATABLE.no),
        value
      );
      return (
        <TNSOButton
          variant={Variants.OutlinePrimary}
          disabled={disabled}
          onClick={(): void => deleteAction(data.name)}
        >
          <DeleteOutlined />
        </TNSOButton>
      );
    },
  },
  {
    dataIndex: 'name',
    title: 'companyProfileName',
    key: 'name',
    ellipsis: true,
    sort: true,
    ...getColumnSearchProps('name'),
  },
  {
    dataIndex: 'note',
    title: 'note',
    key: 'note',
    ellipsis: true,
  },
  {
    dataIndex: 'acnas',
    title: 'associateAcna',
    key: 'acnas',
    ellipsis: true,
  },
];

export const columns = {
  companies,
};

async function handleSearch(
  filter: string | number | boolean,
  keyFilter: string
): Promise<void> {
  if (filter === 'all') {
    filter = '';
  }
  await store.companyProfile.loadData({ [keyFilter]: filter });
}

function deleteAction(companyName: string): void {
  store.companyProfile.setShowModalDelete(true);
  store.companyProfile.setCompanyName(companyName);
}
