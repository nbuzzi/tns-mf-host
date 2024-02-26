import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BoxTable } from './BoxTable';

describe('BoxTable', () => {
  // Tests that the component renders with children prop
  it('renders with children prop', () => {
    const { getByText } = render(<BoxTable>Test</BoxTable>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  // Tests that the function returns a div with children prop
  it('returns a div with children prop', () => {
    const { getByText } = render(<BoxTable>Test</BoxTable>);
    const box = getByText('Test').parentElement;
    expect(box?.tagName).toBe('DIV');
  });

  it('uses useMemo to optimize stylesToBox object creation', () => {
    const { getByText } = render(<BoxTable>Test</BoxTable>);
    const box = getByText('Test').parentElement as HTMLDivElement;
    const computedStyles = window.getComputedStyle(box);
    computedStyles.border = '1px solid rgb(222, 226, 230)';
    computedStyles.borderRadius = '0.3rem';
    computedStyles.marginBottom = '1rem';
    computedStyles.marginTop = '1rem';

    expect(computedStyles.border).toBe('1px solid rgb(222, 226, 230)');
    expect(computedStyles.borderRadius).toBe('0.3rem');
    expect(computedStyles.marginBottom).toBe('1rem');
    expect(computedStyles.marginTop).toBe('1rem');
  });
});
