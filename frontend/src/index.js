import { createRoot } from 'react-dom/client';

import App from './App';
import './App.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(App());
