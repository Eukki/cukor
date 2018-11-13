import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
	// import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WelcomePage />
	, document.getElementById('root'));
registerServiceWorker();
