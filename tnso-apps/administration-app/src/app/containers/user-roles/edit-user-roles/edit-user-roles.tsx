import {
  TNSOButton,
  TNSOCard,
  TNSODivider,
  TNSOGrid,
  TNSOInput,
  Variants,
} from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';
import { useMemo, useState } from 'react';
import { TRANSLATION } from '../../../../translations/translation';
import { columns } from '../../../../store/user-roles/data-table';
import { ColumnsType } from 'antd/lib/table';
import { store } from '../../../../store/store';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';
import './edit-user-roles.scss';

function EditUserRoles(): JSX.Element {
  const { roles } = store.userRoles;
  const { roleName } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(roleName ?? '');

  const roleContent = useMemo(() => {
    return (
      <div className="d-flex gap-2 align-items-center justify-content-between py-3">
        <div className="d-flex gap-2 align-items-center">
          <label htmlFor="roleName">
            *<Text text={TRANSLATION.USER_ROLES.CREATE_ROLE.roleName} />
          </label>
          <TNSOInput
            onChange={(e) => setRole(e.target.value)}
            id="roleName"
            value={role}
          />
        </div>
        <div className="d-flex gap-2">
          <TNSOButton
            variant={Variants.OutlinePrimary}
            onClick={() => navigate(-1)}
          >
            <Text text={TRANSLATION.USER_ROLES.BUTTON.cancel} />
          </TNSOButton>
          <TNSOButton variant={Variants.Primary} disabled={_.isEmpty(role)}>
            <Text text={TRANSLATION.USER_ROLES.BUTTON.save} />
          </TNSOButton>
        </div>
      </div>
    );
  }, [role, navigate]);

  const featureContent = useMemo(() => {
    return (
      <div>
        <h5>
          <b>{TRANSLATION.USER_ROLES.EDIT_ROLE.functionalitiesEnabled}</b>
        </h5>
        <TNSOCard className="card-feature-roles w-100">
          <TNSOGrid
            columns={columns.functionalities as unknown as ColumnsType[]}
            dataSource={
              roles
                ? roles.find((r) => r.name === role)?.featureGroups
                : columns.functionalitiesMocked
            }
            whitoutCard
          />
        </TNSOCard>
      </div>
    );
  }, [role, roles]);

  return (
    <div>
      <h4>
        <b>{TRANSLATION.USER_ROLES.VIEW_ROLE.title}</b>
      </h4>
      <TNSODivider type="horizontal" borderBold />
      {roleContent}
      <TNSODivider type="horizontal" />
      {featureContent}
    </div>
  );
}

export default observer(EditUserRoles);
