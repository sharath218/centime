import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropDown from '../../../components/ui/DropDown';

describe('DropDown Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  test('renders with options', () => {
    render(<DropDown options={options} value="option1" onChange={jest.fn()} />);
    
    // Open the dropdown
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    
    // Check if all options are rendered - use more specific queries
    const option1 = screen.getByRole('option', { name: 'Option 1' });
    const option2 = screen.getByRole('option', { name: 'Option 2' });
    const option3 = screen.getByRole('option', { name: 'Option 3' });
    
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  test('calls onChange when selection changes', () => {
    const handleChange = jest.fn();
    render(<DropDown options={options} value="option1" onChange={handleChange} />);
    
    // Open the dropdown
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    
    // Select a different option
    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('displays the selected value', () => {
    render(<DropDown options={options} value="option2" onChange={jest.fn()} />);
    
    // Check if the correct option is displayed
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('applies custom props', () => {
    render(
      <DropDown 
        options={options} 
        value="option1" 
        onChange={jest.fn()} 
        data-testid="custom-dropdown"
      />
    );
    expect(screen.getByTestId('custom-dropdown')).toBeInTheDocument();
  });

  test('allows selecting a different option', () => {
    const handleChange = jest.fn((event) => {
      // Mock the event handling to update the component properly
      // This simulates what your actual component would do
      render(<DropDown options={options} value="option2" onChange={handleChange} />);
    });
    
    render(<DropDown options={options} value="option1" onChange={handleChange} />);
    
    // Open the dropdown - Use combobox role instead of button
    const selectElement = screen.getByRole('combobox');
    fireEvent.mouseDown(selectElement);
    
    // Select a different option - after clicking, the options should be in the dropdown
    const optionToSelect = screen.getByRole('option', { name: 'Option 2' });
    fireEvent.click(optionToSelect);
    
    // Verify the onChange was called with the correct value
    expect(handleChange).toHaveBeenCalled();
    
    // Instead of checking the text content directly (which may not update in the test),
    // verify that onChange was called with the expected event
    const changeEvent = handleChange.mock.calls[0][0];
    expect(changeEvent.target.value).toBe('option2');
  });
});