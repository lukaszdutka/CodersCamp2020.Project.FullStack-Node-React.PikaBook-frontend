import { render, screen } from '@testing-library/react';
import App from './App';

test('not renders learn react link', () => {
  render(<App />);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).not.toBeInTheDocument();
});

test('renders app elements', () => {
  const { container } = render(
    <App />
  );
  expect(container.getElementsByTagName('main').length).toBe(1);
  expect(container.getElementsByClassName('header').length).toBe(1);
  // expect(container.getElementsByTagName('header').length).toBe(1);
  expect(container.getElementsByTagName('footer').length).toBe(1);
});