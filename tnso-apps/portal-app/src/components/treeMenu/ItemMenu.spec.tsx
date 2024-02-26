import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ItemMenu } from './ItemMenu';

describe('ItemMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ItemMenu />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with devicesAmount', () => {
    const { queryByText } = render(<ItemMenu devicesAmount={5} />);

    expect(queryByText(/\(5\)/i)).toBeInTheDocument();
  });
});
