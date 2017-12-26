import React from 'react';
import ReactDOM from 'react-dom';

// components
import App from './App';

// services
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
