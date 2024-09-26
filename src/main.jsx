import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './global.css';

import Layout from '@/components/layout/index.jsx';

createRoot(document.getElementById('root')).render(
  <Layout>
    <App />
  </Layout>
);
