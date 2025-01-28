import './App.css';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={"index"}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<div style={{textAlign: "center", fontSize: "x-large"}}><br/>404 - Page not found</div>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
