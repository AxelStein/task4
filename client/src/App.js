import 'dotenv/config';
import './App.css';
import AuthInterceptor from './auth/AuthInterceptor.js';
import AuthPage from './auth/AuthPage.js';
import DashboardPage from './dashboard/DashboardPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthInterceptor/>
      <Routes>
        <Route path='/sign-up' element={<AuthPage isSignIn={false} />} />
        <Route path='/sign-in' element={<AuthPage isSignIn={true} />} />
        <Route path='/' element={<DashboardPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
