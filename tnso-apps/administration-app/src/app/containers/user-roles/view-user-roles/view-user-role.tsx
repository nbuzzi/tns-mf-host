// Dependencies
import { useCallback, useMemo } from 'react';
import { TNSODivider } from '@tnso/ui-components/dist';
import { TRANSLATION } from '../../../../translations/translation';
// Components
import ViewUserRolesEmpty from '../../../components/user-roles/view-user-roles-empty/view-user-roles-empty';
import ViewUserRolesList from '../../../components/user-roles/view-user-roles-list/view-user-roles-list';
import { useAsyncCall } from '../../../../hooks/useAsyncCall';
import { store } from '../../../../store/store';
import { observer } from 'mobx-react';

export function ViewUserRole(): JSX.Element | null {
  const { getRoles, roles } = store.userRoles;

  const isRoles = useMemo(() => roles.length > 0, [roles]);
  const emptyView = useMemo(() => {
    return <ViewUserRolesEmpty />;
  }, []);
  const listView = useMemo(() => {
    return <ViewUserRolesList roles={roles} />;
  }, [roles]);

  const loadMethod = useCallback(async () => await getRoles(), [getRoles]);

  useAsyncCall(loadMethod, []);

  return (
    <div>
      <h4>
        <b>{TRANSLATION.USER_ROLES.VIEW_ROLE.title}</b>
      </h4>
      <TNSODivider borderBold type="horizontal" />
      {isRoles ? listView : emptyView}
    </div>
  );
}

export default observer(ViewUserRole);
