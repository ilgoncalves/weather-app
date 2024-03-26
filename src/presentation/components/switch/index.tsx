import { FC, useState } from 'react';
import Styles from './styles.module.scss';

interface SwitchProps {
  leftLabel: string;
  rightLabel: string;
  onChange?: (isChecked: boolean) => void;
}

const Switch: FC<SwitchProps> = ({ leftLabel, rightLabel, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className={Styles.container}>
      <span className={Styles.label}>{leftLabel}</span>
      <input
        checked={isChecked}
        onChange={handleToggle}
        data-testid="switch-input"
        className={Styles.switchInput}
        type="checkbox"
      />

      <div className={Styles.switch}></div>
      <span className={Styles.label}>{rightLabel}</span>
    </label>
  );
};

export default Switch;
