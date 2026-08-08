import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login links in the header', () => {
  render(<App />);
  expect(screen.getByText(/TMDB login/i)).toBeInTheDocument();
  expect(screen.getByText(/Guest login/i)).toBeInTheDocument();
});
