import { render, screen } from '@testing-library/react';
import { Icon } from 'src/presentation/components';

describe('Icon', () => {
  it('should render the icon with the correct src based on iconId', () => {
    const iconId = '10d';
    render(<Icon iconId={iconId} />);
    const imgElement = screen.getByRole('img');

    expect(imgElement).toHaveAttribute(
      'src',
      `http://openweathermap.org/img/wn/${iconId}@4x.png`
    );
  });
});
