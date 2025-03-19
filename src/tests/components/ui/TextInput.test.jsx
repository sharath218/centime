
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../../../components/ui/TextInput';

describe('TextInput Component', () => {
  test('renders with label', () => {
    render(<TextInput label="Test Input" />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  test('calls onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<TextInput value="" onChange={handleChange} label="Test Input" />);
    
    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('displays the correct value', () => {
    render(<TextInput value="test value" label="Test Input" onChange={jest.fn()} />);
    expect(screen.getByLabelText('Test Input')).toHaveValue('test value');
  });

  test('applies custom props', () => {
    render(
      <TextInput 
        value="" 
        label="Test Input" 
        onChange={jest.fn()} 
        data-testid="custom-prop"
      />
    );
    expect(screen.getByTestId('custom-prop')).toBeInTheDocument();
  });

  test('renders with correct type', () => {
    render(<TextInput value="5" type="number" label="Number Input" onChange={jest.fn()} />);
    expect(screen.getByLabelText('Number Input')).toHaveAttribute('type', 'number');
  });
});