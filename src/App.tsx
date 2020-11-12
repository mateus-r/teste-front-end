import React from 'react';
import "antd/dist/antd.less";
import { MainPage } from './pages/MainPage';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.less'

function App() {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
