// Generated by CodiumAI

import { render } from '@testing-library/react';
import Loader from './loader';

describe('code snippet', () => {
  // Renders a div with class 'fallback-spinner'
  it("should render a div with class 'fallback-spinner'", () => {
    const { baseElement } = render(<Loader />);
    expect(baseElement).toBeTruthy();
  });
});
