import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewUserRolesList from './view-user-roles-list';
import { BrowserRouter } from 'react-router-dom';

// Importar el resto de las configuraciones de Jest

describe('ViewUserRolesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ViewUserRolesList roles={[]} key={'key'} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
