import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalPrice from '../TotalPrice';  // Adjust the import path if necessary

test('renders income and outcome values correctly', () => {
  const income = 1000;
  const outcome = 500;
  
  render(<TotalPrice income={income} outcome={outcome} />);

  // Find the elements containing just "Income" and "Outcome" texts
//   const incomeElement = screen.getByText(/Income:/i);
//   const outcomeElement = screen.getByText(/Outcome:/i);

  // Check if the actual values are in the document
  expect(screen.getByText(/1000/)).toBeInTheDocument();
  expect(screen.getByText(/500/)).toBeInTheDocument();
});
