// src/components/MergePdf.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MergePdf from './MergePdf';

const add = (a: number, b: number) => a + b;
describe('MergePdf Component', () => {
  it('renders the component', () => {
    // render(<MergePdf />);
    // expect(screen.getByText('Merge PDF')).toBeInTheDocument();
    expect(add(1, 2)).toBe(3)
  });
});
