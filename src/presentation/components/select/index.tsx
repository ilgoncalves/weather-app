import { FC, useEffect, useRef, useState } from 'react';
import Styles from './styles.module.scss';

export interface Option {
  label: string;
  value: string;
}

export interface SelectProps {
  options: Option[];
  onChange: (value: string) => void;
}

const Select: FC<SelectProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    onChange(selectedOption.value);
  }, []);

  return (
    <div className={Styles.selectAnimated}>
      <div
        className={Styles.selectDisplay}
        onClick={toggleDropdown}
        data-testid="select-display"
      >
        {selectedOption.label}
        <span
          data-testid="select-arrow"
          className={[Styles.arrow, isOpen ? Styles.open : 'close'].join(' ')}
        ></span>
      </div>

      <ul
        ref={dropdownRef}
        className={[Styles.selectOptions, isOpen ? Styles.show : 'hide'].join(
          ' '
        )}
        data-testid="select-options"
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            data-testid={`option-${index}`}
            className={
              selectedOption.value === option.value ? Styles.selected : ''
            }
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
