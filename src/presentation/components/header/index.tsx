import { FC } from 'react';
import Styles from './styles.module.scss';

interface HeaderProps {
  title: string;
}
const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className={Styles.header}>
      <a
        target="_blank"
        className={Styles.appLink}
        rel="noopener noreferrer"
        href="https://www.leadzai.com/"
      >
        <span className={Styles.headerTitle}>{title}</span>
      </a>
    </header>
  );
};

export default Header;
