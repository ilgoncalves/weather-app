import { FC } from 'react';

import Styles from './styles.module.scss';

interface IconProps {
  iconId: string;
}

const Icon: FC<IconProps> = ({ iconId }) => {
  const makeIconUrl = (iconId: string): string =>
    `http://openweathermap.org/img/wn/${iconId}@4x.png`;

  return (
    <img
      className={Styles.icon}
      data-testid="img-icon"
      src={makeIconUrl(iconId)}
    />
  );
};

export default Icon;
