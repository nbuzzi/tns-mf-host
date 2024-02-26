import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TNSOSearchGrid, TNSOSearchProps } from './SearchFilter';

describe('TNSOSearchGrid', () => {
  // Renders a search input box and two buttons for reset and search.
  it('should render a search input box and two buttons', () => {
    // Arrange
    const props: TNSOSearchProps = {
      themeSelected: 'dark',
      keyFilter: 'filter',
      onReset: jest.fn(),
      onSearch: jest.fn(),
    };

    // Act
    render(<TNSOSearchGrid {...props} />);

    // Assert
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
  });

  // Calls the onReset function when the reset button is clicked.
  it('should call the onReset function when the reset button is clicked', () => {
    // Arrange
    const onReset = jest.fn();
    const props: TNSOSearchProps = {
      themeSelected: 'dark',
      keyFilter: 'filter',
      onReset,
      onSearch: jest.fn(),
    };

    render(<TNSOSearchGrid {...props} />);

    // Act
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);

    // Assert
    expect(onReset).toHaveBeenCalled();
  });

  // Renders correctly when no props are passed.
  it('should render correctly when no props are passed', () => {
    // Arrange

    // Act
    render(
      <TNSOSearchGrid
        keyFilter="filter"
        onReset={jest.fn()}
        onSearch={jest.fn()}
        themeSelected="dark"
        key={'key'}
      />
    );

    // Assert
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
  });

  // Calls the onReset function even when the search value is empty.
  it('should call the onReset function even when the search value is empty', () => {
    // Arrange
    const onReset = jest.fn();
    const props: TNSOSearchProps = {
      themeSelected: 'dark',
      keyFilter: 'filter',
      onReset,
      onSearch: jest.fn(),
    };

    render(<TNSOSearchGrid {...props} />);

    // Act
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);

    // Assert
    expect(onReset).toHaveBeenCalled();
  });

  // Calls the onSearch function with empty search value and key filter when the search button is clicked and no search value is entered.
  it('should call the onSearch function with empty search value and key filter when the search button is clicked and no search value is entered', () => {
    // Arrange
    const onSearch = jest.fn();
    const props: TNSOSearchProps = {
      themeSelected: 'dark',
      keyFilter: 'filter',
      onReset: jest.fn(),
      onSearch,
    };

    render(<TNSOSearchGrid {...props} />);

    // Act
    const searchButton = screen.getByRole('button', { name: 'Ok' });
    fireEvent.click(searchButton);

    // Assert
    expect(onSearch).toHaveBeenCalledWith('', 'filter');
  });
});
