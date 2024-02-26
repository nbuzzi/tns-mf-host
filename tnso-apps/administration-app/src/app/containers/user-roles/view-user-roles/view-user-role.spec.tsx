import { render } from '@testing-library/react';

import ViewUserRole from './view-user-role';
import { BrowserRouter } from 'react-router-dom';

describe('ViewUserRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ViewUserRole />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
