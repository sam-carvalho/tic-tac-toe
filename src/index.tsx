import ReactDOM from 'react-dom/client';
import Game from './components/Game';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Game />);

