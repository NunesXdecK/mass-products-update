import React from 'react';
import { render, screen } from '@testing-library/react';
import MassPriceUpdate from '.';

test('renders learn react link', () => {
  render(<MassPriceUpdate />);
  const linkElement = screen.getByText(/atualizar preços/i);
  expect(linkElement).toBeInTheDocument();
});
