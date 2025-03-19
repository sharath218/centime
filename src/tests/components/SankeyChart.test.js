import React from 'react';
import { render, screen } from '@testing-library/react';
import SankeyChart from '../components/SankeyChart';

describe('SankeyChart Component', () => {
    it('renders without crashing', () => {
        render(<SankeyChart data={{ nodes: [], links: [] }} />);
        expect(screen.getByTestId('sankey-chart')).toBeInTheDocument();
    });

    it('renders nodes and links correctly', () => {
        const data = {
            nodes: [{ id: 'A' }, { id: 'B' }],
            links: [{ source: 'A', target: 'B', value: 10 }],
        };
        render(<SankeyChart data={data} />);
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
    });

    it('handles empty data gracefully', () => {
        render(<SankeyChart data={{ nodes: [], links: [] }} />);
        expect(screen.queryByText(/.+/)).not.toBeInTheDocument(); // No nodes or links
    });
});
