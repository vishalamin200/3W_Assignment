import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import UserForm from './pages/UserForm';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
