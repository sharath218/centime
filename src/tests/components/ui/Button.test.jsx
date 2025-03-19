
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/ui/Button';

describe('Button Component', () => {
  test('renders with children', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('uses the provided variant', () => {
    render(<Button variant="outlined">Outlined Button</Button>);
    const button = screen.getByText('Outlined Button');
    expect(button).toHaveClass('MuiButton-outlined');
  });

  test('default variant is contained', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByText('Default Button');
    expect(button).toHaveClass('MuiButton-contained');
  });

  test('applies custom props', () => {
    render(
      <Button 
        data-testid="custom-button" 
        color="secondary"
      >
        Custom Button
      </Button>
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-colorSecondary');
  });
});