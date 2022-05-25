import React from 'react'
import * as ReactDOM from 'react-dom'
//import './index.css'
//import App from './App'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {createRoot} from 'react-dom/client'
import Panel from './panel'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="panel" element={<Panel />} />
      </Routes>
    </>
  )

}

const Index = () => {
  return <>Welcome to the Wokr Item Doc Generator</>
}

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// )


const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Panel />
    </React.StrictMode>
  );
}