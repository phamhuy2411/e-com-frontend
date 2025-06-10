import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/reducers/store.js'

try {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
}
