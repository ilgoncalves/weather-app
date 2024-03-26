import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Switch from 'src/presentation/components/switch';

const makeSut = (props = {}) => {
  const leftLabel = '°C';
  const rightLabel = '°F';
  const utils = render(
    <Switch leftLabel={leftLabel} rightLabel={rightLabel} {...props} />
  );

  const switchInput = screen.getByRole('checkbox');

  return {
    switchInput,
    leftLabel,
    rightLabel,
    ...utils,
  };
};

describe('Switch Component', () => {
  test('renders with given labels', () => {
    const { leftLabel, rightLabel } = makeSut();

    expect(screen.getByText(leftLabel)).toBeInTheDocument();
    expect(screen.getByText(rightLabel)).toBeInTheDocument();
  });

  test('toggles switch when clicked', () => {
    const { switchInput } = makeSut();

    expect(switchInput).not.toBeChecked();
    fireEvent.click(switchInput);
    expect(switchInput).toBeChecked();
    fireEvent.click(switchInput);
    expect(switchInput).not.toBeChecked();
  });

  test('calls onChange callback when provided', () => {
    const handleChange = jest.fn();
    const { switchInput } = makeSut({ onChange: handleChange });
    fireEvent.click(switchInput);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
    fireEvent.click(switchInput);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
