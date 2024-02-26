import { render } from '@testing-library/react';

import DeleteUserRoles from './delete-user-roles';

describe('DeleteUserRoles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteUserRoles />);
    expect(baseElement).toBeTruthy();
  });
});
