import { render } from '@testing-library/react';

import CreateUserRoles from './create-user-roles';

describe('CreateUserRoles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateUserRoles />);
    expect(baseElement).toBeTruthy();
  });
});
