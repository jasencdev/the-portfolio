import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectPostLoader from '../src/components/projectPostLoader';

test('renders ProjectPostLoader component', () => {
  render(<ProjectPostLoader filePath="test-file-path" />);
  expect(screen.getByText('Looking for file with ID: test-file-path')).toBeInTheDocument();
});