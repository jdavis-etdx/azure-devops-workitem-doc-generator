import React from 'react'
import * as ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'
import Panel from './panel'

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Panel />
    </React.StrictMode>
  );
}

