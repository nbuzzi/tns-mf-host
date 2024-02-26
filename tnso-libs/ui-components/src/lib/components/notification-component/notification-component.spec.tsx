import { render } from '@testing-library/react';

import NotificationComponent from './notification-component';

describe('NotificationComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationComponent />);
    expect(baseElement).toBeTruthy();
  });
});
