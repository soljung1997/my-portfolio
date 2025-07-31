// src/tests/TodoList.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../pages/TodoList';

// Mock axios
jest.mock('../api/axios', () => ({
  get: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

import api from '../api/axios';

describe('TodoList Component', () => {
  it('renders fetched todo items', async () => {
    // Mock response from API
    api.get.mockResolvedValueOnce({
      data: [
        { _id: '1', title: 'Buy Groceries', description: 'Eggs and Chicken' },
        { _id: '2', title: 'Study', description: 'Finish Assignment 3' },
      ],
    });

    render(<TodoList />);

    // Wait for async rendering
    await waitFor(() => {
      expect(screen.getByText('Buy Groceries — Eggs and Chicken')).toBeInTheDocument();
      expect(screen.getByText('Study — Finish Assignment 3')).toBeInTheDocument();
    });
  });
});
