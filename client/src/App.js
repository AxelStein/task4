import './App.css';
import AuthPage from './auth/AuthPage.js';
import DashboardPage from './dashboard/DashboardPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return DashboardPage();
  // return AuthPage(true);
}

export default App;
