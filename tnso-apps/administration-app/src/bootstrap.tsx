import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import ViewUserRole from './app/containers/user-roles/view-user-roles/view-user-role';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ViewUserRole />
  </StrictMode>
);
