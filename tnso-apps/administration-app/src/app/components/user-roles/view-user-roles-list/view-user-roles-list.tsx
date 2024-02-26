import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  TNSOButton,
  TNSOCard,
  TNSODivider,
  TNSOGrid,
  TNSOSelector,
  Variants,
} from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';
import { TRANSLATION } from '../../../../translations/translation';
import { IViewUserRolesList } from '../../../../models/user-role.model';
import { store } from '../../../../store/store';
import { columns } from '../../../../store/user-roles/data-table';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import './view-user-roles-list.scss';

export function ViewUserRolesList(props: IViewUserRolesList) {
  const { getUserAssociateByRole, usersAssociateByRole } = store.userRoles;
  const navigate = useNavigate();
  const [roleSelected, setRoleSelected] = useState<string>();

  const roleNames = useMemo(
    () => props.roles.map((role) => ({ label: role.name, value: role.name })),
    [props.roles]
  );

  const handleChangeRole = useCallback(
    async (value: string) => {
      setRoleSelected(value);
      await getUserAssociateByRole(value);
    },
    [getUserAssociateByRole]
  );

  const handleCreateRole = useCallback(() => {
    navigate(`/administration/user-roles/create`);
  }, [navigate]);

  const handleEditRole = useCallback(() => {
    navigate(`/administration/user-roles/edit/${roleSelected}`);
  }, [navigate, roleSelected]);

  const handleDeleteRole = useCallback(() => {
    console.log('delete role', roleSelected);
  }, [roleSelected]);

  const featuresGrid = useMemo(() => {
    return (
      <TNSOCard className="w-100 card-feature-roles">
        <TNSOGrid
          columns={
            columns.functionalitiesWitchCheckDisabled as unknown as ColumnsType[]
          }
          dataSource={
            roleSelected
              ? props.roles.find((r) => r.name === roleSelected)?.featureGroups
              : columns.functionalitiesMocked
          }
          disabled={_.isEmpty(roleSelected)}
          whitoutCard
        />
      </TNSOCard>
    );
  }, [roleSelected, props.roles]);

  const usersGrid = useMemo(() => {
    return (
      <TNSOCard className="w-100 card-users-by-role">
        <TNSOGrid
          columns={columns.usersByRole as unknown as ColumnsType[]}
          dataSource={usersAssociateByRole.users}
          whitoutCard
        />
      </TNSOCard>
    );
  }, [usersAssociateByRole]);

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-center py-3">
        <TNSOSelector
          options={roleNames}
          onChange={handleChangeRole}
          value={roleSelected}
          placeholder={TRANSLATION.USER_ROLES.VIEW_ROLE.selectARole}
        />
        <div className="d-flex justify-content-end align-items-center gap-2">
          <TNSOButton
            variant={Variants.Secondary}
            onClick={handleDeleteRole}
            disabled={_.isEmpty(usersAssociateByRole.users)}
          >
            <Text text={TRANSLATION.USER_ROLES.BUTTON.deleteRole} />
          </TNSOButton>
          <TNSOButton variant={Variants.Primary} onClick={handleCreateRole}>
            <Text text={TRANSLATION.USER_ROLES.BUTTON.addRole} />
          </TNSOButton>
        </div>
      </div>
      <div className="d-flex flex-column gap-1 w-100">
        <TNSODivider type="horizontal" />
        <div className="d-flex justify-content-end">
          <TNSOButton
            variant={Variants.OutlinePrimary}
            onClick={handleEditRole}
            disabled={_.isEmpty(roleSelected)}
          >
            <Text text={TRANSLATION.USER_ROLES.BUTTON.editRole} />
          </TNSOButton>
        </div>
        {featuresGrid}
      </div>
      <div>
        <h5>
          <b>{TRANSLATION.USER_ROLES.VIEW_ROLE.userAssociated}: </b>
        </h5>
        <TNSODivider type="horizontal" />
        <div className="d-flex justify-content-start align-items-center w-100">
          {usersGrid}
        </div>
      </div>
    </div>
  );
}

export default observer(ViewUserRolesList);
