import { render } from '@testing-library/react';

import { TNSODivider } from './divider-component';
import { TypesDivider } from './divider-component.model';

describe('Divider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TNSODivider type={TypesDivider.vertical} />
    );
    expect(baseElement).toBeTruthy();
  });
});
