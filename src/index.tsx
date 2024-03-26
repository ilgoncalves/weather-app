import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { makeWeatherPage } from './application/factories/pages/Weather';
import './presentation/styles/global.module.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<StrictMode>{makeWeatherPage()}</StrictMode>);
