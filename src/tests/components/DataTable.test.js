import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from '../components/DataTable';

describe('DataTable Component', () => {
    it('renders without crashing', () => {
        render(<DataTable data={[]} columns={[]} />);
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('displays the correct number of rows', () => {
        const data = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
        ];
        const columns = ['id', 'name'];
        render(<DataTable data={data} columns={columns} />);
        expect(screen.getAllByRole('row')).toHaveLength(data.length + 1); // +1 for header row
    });

    it('renders column headers correctly', () => {
        const columns = ['id', 'name'];
        render(<DataTable data={[]} columns={columns} />);
        columns.forEach((col) => {
            expect(screen.getByText(col)).toBeInTheDocument();
        });
    });
});
