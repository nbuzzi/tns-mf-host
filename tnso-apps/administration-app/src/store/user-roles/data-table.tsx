import { Checkbox } from 'antd';
import React from 'react';
// eslint-disable-next-line
const functionalities = [
  {
    dataIndex: 'name',
    title: 'features',
    key: 'name',
  },
  {
    dataIndex: 'associated',
    title: 'associated',
    key: 'associated',
    render: (): JSX.Element => <Checkbox />,
    align: 'center',
  },
];

const functionalitiesWitchCheckDisabled = [
  {
    dataIndex: 'name',
    title: 'features',
    key: 'name',
  },
  {
    dataIndex: 'associated',
    title: 'associated',
    key: 'associated',
    render: (value: boolean): JSX.Element => (
      <Checkbox disabled checked={value} />
    ),
    align: 'center',
  },
];

const usersByRole = [
  {
    dataIndex: 'username',
    title: 'username',
    key: 'username',
  },
  {
    dataIndex: 'email',
    title: 'email',
    key: 'email',
  },
];

const functionalitiesMocked = [
  { features: 'Monitoring' },
  { features: 'Administration' },
  { features: 'Self Service Tools' },
  { features: 'Support' },
  { features: 'Help' },
];

export const columns = {
  functionalities,
  functionalitiesWitchCheckDisabled,
  usersByRole,
  functionalitiesMocked,
};
