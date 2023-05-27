import logo from './logo.svg';
import './App.css';
import Hooks from './components/hooks';
import Props from './components/props';
//router dom: Es una colección de componentes de navegación. Nos brindara un enrutamiento dinámico sin recargar la página
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Props message="Bienvenido" name ="Adrián"></Props>
        <Hooks></Hooks>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contacto</Link>
              </li>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
            </ul>
          </div>
          <Routes>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            {/* El name es dinámico y la info que recibamos se cargará en profile. En el navegador debemos tipear: /profile/<nombre> */}
            <Route path="/profile/:name" element={<Profile></Profile>}></Route> 
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
