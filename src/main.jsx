import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { initGsap } from './app/lib/gsapSetup';
import './styles/index.css';

initGsap();

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
