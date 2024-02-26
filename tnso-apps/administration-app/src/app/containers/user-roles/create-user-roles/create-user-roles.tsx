import {
  TNSOButton,
  TNSODivider,
  TNSOGrid,
  TNSOInput,
  TNSOSteps,
  Variants,
} from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';
import styles from './create-user-roles.module.scss';
import { useCallback, useMemo, useState } from 'react';
import { TRANSLATION } from '../../../../translations/translation';
import { columns } from '../../../../store/user-roles/data-table';
import { ColumnsType } from 'antd/lib/table';
import { store } from '../../../../store/store';
import _ from 'lodash';
import { observer } from 'mobx-react';

function CreateUserRoles(): JSX.Element {
  const { createRole } = store.userRoles;

  const [currentStep, setCurrentStep] = useState(0);
  const [roleName, setRoleName] = useState('');

  const handleClick = useCallback(
    async (roleName: string) => {
      await createRole({ name: roleName });
      setCurrentStep(currentStep + 1);
    },
    [currentStep, createRole]
  );

  const stepOne = useMemo(() => {
    return (
      <div className="d-flex gap-2 align-items-center justify-content-between py-3">
        <div className="d-flex gap-2 align-items-center">
          <label htmlFor="roleName">
            *<Text text={TRANSLATION.USER_ROLES.CREATE_ROLE.roleName} />
          </label>
          <TNSOInput
            onChange={(e) => setRoleName(e.target.value)}
            id="roleName"
            value={roleName}
          />
        </div>
        <TNSOButton
          variant={Variants.Primary}
          onClick={() => handleClick(roleName)}
          disabled={_.isEmpty(roleName)}
        >
          <Text text={TRANSLATION.USER_ROLES.BUTTON.next} />
        </TNSOButton>
      </div>
    );
  }, [handleClick, roleName]);

  const stepTwo = useMemo(() => {
    return (
      <TNSOGrid
        columns={columns.functionalities as unknown as ColumnsType[]}
        dataSource={columns.functionalitiesMocked}
        disabled={currentStep !== 1}
        whitoutCard
      />
    );
  }, [currentStep]);

  return (
    <div className={styles['container']}>
      <h4>
        <b>User Roles</b>
      </h4>
      <TNSODivider type="horizontal" />
      <TNSOSteps
        direction="vertical"
        progressDot
        current={currentStep}
        items={[
          {
            title: (
              <Text text={TRANSLATION.USER_ROLES.CREATE_ROLE.createRole} />
            ),
            description: stepOne,
          },
          {
            title: (
              <Text
                text={TRANSLATION.USER_ROLES.CREATE_ROLE.functionalitiesEnabled}
              />
            ),
            description: (
              <div className="d-flex justify-content-start align-items-center w-75">
                {stepTwo}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default observer(CreateUserRoles);
