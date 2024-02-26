import { render } from '@testing-library/react';

import ViewUserRolesEmpty from './view-user-roles-empty';
import { BrowserRouter } from 'react-router-dom';

describe('ViewUserRoles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ViewUserRolesEmpty />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
