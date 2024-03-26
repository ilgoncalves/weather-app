import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from 'src/presentation/components/header';

describe('Header Component', () => {
  test('renders with given title', () => {
    const title = 'Weather App';
    render(<Header title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
