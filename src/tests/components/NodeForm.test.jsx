import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NodeForm from '../../components/NodeForm'; // Adjusted path

// Mock the random ID generation function
jest.mock('../../components/NodeForm', () => {
  const originalModule = jest.requireActual('../../components/NodeForm');
  return {
    __esModule: true, // Ensure the module is treated as an ES module
    ...originalModule,
    generateRandomId: jest.fn(() => 'node_mocked123') // Mock only the specific function
  };
});

describe('NodeForm Component', () => {
  const mockSetNewNode = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders the name input field', () => {
    render(
      <NodeForm 
        newNode={{ name: '' }} 
        setNewNode={mockSetNewNode} 
      />
    );
    
    expect(screen.getByLabelText('name')).toBeInTheDocument();
  });
  
  test('updates the name when input changes', () => {
    render(
      <NodeForm 
        newNode={{ name: '' }} 
        setNewNode={mockSetNewNode} 
      />
    );
    
    const nameInput = screen.getByLabelText('name');
    fireEvent.change(nameInput, { target: { value: 'New Test Node' } });
    
    expect(mockSetNewNode).toHaveBeenCalledWith({ name: 'New Test Node' });
  });
  
  test('form submission generates random ID', () => {
    render(
      <NodeForm 
        newNode={{ name: 'Test Node' }} 
        setNewNode={mockSetNewNode} 
      />
    );
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    expect(mockSetNewNode).toHaveBeenCalledWith({ 
      name: 'Test Node', 
      id: 'node_mocked123' 
    });
  });
});