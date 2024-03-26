import { fireEvent, render, screen } from '@testing-library/react';
import Select, { SelectProps } from 'src/presentation/components/select';

const makeSut = ({ options, onChange }: SelectProps) =>
  render(<Select options={options} onChange={onChange} />);

const mockOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
];

describe('Select Component', () => {
  const handleChange = jest.fn();

  describe('Initialization and Rendering', () => {
    beforeEach(() => {
      makeSut({ options: mockOptions, onChange: handleChange });
    });

    test('should call the onChange only 1 time when the component is mounted', () => {
      expect(handleChange).toBeCalledTimes(1);
    });

    test('renders with the first option selected by default', () => {
      const display = screen.getByTestId('select-display');
      expect(display.textContent).toBe(mockOptions[0].label);
    });

    test('dropdown is initially closed', () => {
      const dropdown = screen.getByTestId('select-options');
      expect(dropdown).not.toHaveClass('show');
    });
  });

  describe('User Interaction', () => {
    beforeEach(() => {
      makeSut({ options: mockOptions, onChange: handleChange });
    });

    test('can toggle dropdown open and closed on display click', () => {
      const display = screen.getByTestId('select-display');
      fireEvent.click(display);

      expect(screen.queryByTestId('select-options')).not.toHaveClass('hide');

      fireEvent.click(display);
      expect(screen.getByTestId('select-options')).toHaveClass('hide');
    });

    test('selecting an option closes the dropdown and updates the display', () => {
      fireEvent.click(screen.getByTestId('select-display'));
      fireEvent.click(screen.getByTestId('option-1'));

      expect(screen.getByTestId('select-display').textContent).toBe(
        mockOptions[1].label
      );
      expect(screen.queryByTestId('select-options')).toHaveClass('hide');
    });
  });

  describe('Callbacks and State Updates', () => {
    beforeEach(() => {
      makeSut({ options: mockOptions, onChange: handleChange });
    });

    test('onChange is called with the correct value when an option is selected', () => {
      fireEvent.click(screen.getByTestId('select-display'));
      fireEvent.click(screen.getByTestId('option-1'));

      expect(handleChange).toHaveBeenCalledWith(mockOptions[1].value);
    });

    test('selecting the already selected option should trigger onChange', () => {
      fireEvent.click(screen.getByTestId('select-display'));
      fireEvent.click(screen.getByTestId('option-0'));

      expect(handleChange).toHaveBeenCalled();
    });
  });
});
