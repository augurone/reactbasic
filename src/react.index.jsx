import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './components/AppWrapper';

const root = createRoot(document.getElementById('root'));

root.render(<AppWrapper />);
