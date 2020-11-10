import React from 'react';
import "antd/dist/antd.css";
import { MainPage } from './pages/MainPage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
