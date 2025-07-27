import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginPage from './LoginPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiClient = axios.create({
  baseURL: 'http://0.0.0.0:3003/api/v1',
  withCredentials: true
});

apiClient.post(
  '/auth/login', {
  'email': 'diefaust@gmail.com',
  'password': '12345'
},
  { withCredentials: true }
)
  // instance.get('/user/list')
  .then(response => {
    console.log(response);

    apiClient.get('/user/list', { withCredentials: true })
      .then(r => console.log(r))
      .catch(e => console.log(e));
  })
  .catch(e => { console.log(e) });

function App() {
  return LoginPage();
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
