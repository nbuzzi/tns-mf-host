import { render } from '@testing-library/react';
import { CustomNode, Status } from './CustomNode';
import '@testing-library/jest-dom';

describe('code snippet', () => {
  // Tests that the component renders with minimum props
  it('should render with minimum props', () => {
    const { getByText } = render(
      <CustomNode
        inputs={[]}
        backgroundColor="red"
        text="Test"
        status={Status.secondary}
        length={0}
      />
    );
    const node = getByText('Test');

    expect(node).toBeInTheDocument();
  });

  // Tests that the component renders with width and height set to 70px when length is greater than 15
  it('should render with width and height set to 70px when length is greater than 15', () => {
    const { container } = render(
      <CustomNode
        inputs={[]}
        backgroundColor="red"
        text="Test"
        status={Status.secondary}
        length={20}
      />
    );
    const node = container.firstChild;

    expect(node).toHaveStyle('width: 70px');
    expect(node).toHaveStyle('height: 70px');
  });

  // Tests that the component renders with colorText set to black when status is secondary
  it('should render with colorText set to black when status is secondary', () => {
    const { getByText } = render(
      <CustomNode
        inputs={[]}
        backgroundColor="red"
        text="Test"
        status={Status.secondary}
        length={0}
      />
    );
    const node = getByText('Test');

    expect(node).toHaveStyle('color: black');
  });

  // Tests that the component renders with no input elements when inputs array is empty
  it('should render with no input elements when inputs array is empty', () => {
    const { queryByRole } = render(
      <CustomNode
        inputs={[]}
        backgroundColor="red"
        text="Test"
        status={Status.secondary}
        length={0}
      />
    );
    const inputsRendered = queryByRole('div', { name: /Input/ });

    expect(inputsRendered).toBeNull();
  });
});
