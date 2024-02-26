// Dependencies
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';
import Text from 'i18n-module/i18nModule';
import { TRANSLATION } from '../../../../translations/translation';

export function ViewUserRolesEmpty() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/administration/user-roles/create');
  }, [navigate]);

  return (
    <>
      <div className="d-flex justify-content-end align-items-center">
        <TNSOButton variant={Variants.Primary} onClick={handleClick}>
          <Text text={TRANSLATION.USER_ROLES.BUTTON.addRole} />
        </TNSOButton>
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 h-100 mt-5">
        <Text text={TRANSLATION.USER_ROLES.VIEW_ROLE.noItemToDisplay} />
      </div>
    </>
  );
}

export default ViewUserRolesEmpty;
