Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Para compatibilidad con versiones más antiguas
    removeListener: jest.fn(), // Para compatibilidad con versiones más antiguas
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    reload: jest.fn(),
    assign: jest.fn(),
    href: 'http://localhost/',
    replace: jest.fn(),
  },
});
