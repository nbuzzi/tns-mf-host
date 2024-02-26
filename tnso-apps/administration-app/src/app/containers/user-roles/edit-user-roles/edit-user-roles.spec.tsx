import { render } from '@testing-library/react';

import EditUserRoles from './edit-user-roles';
import { BrowserRouter } from 'react-router-dom';

describe('EditUserRoles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <EditUserRoles />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
