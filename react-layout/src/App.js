import './App.css';
//router dom: Es una colección de componentes de navegación. Nos brindara un enrutamiento dinámico sin recargar la página
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Contact from './pages/Contact';
import About from './pages/About';
import Layout from './components/layout';

function App() {
  return (
      <Router>
        <Layout>
        <Routes>
          <Route path="/Contact" element={<Contact>Contacto</Contact>}></Route>
          {/* El name es dinámico y la info que recibamos se cargará en profile. En el navegador debemos tipear: /profile/<nombre> */}
          <Route path="/About" element={<About>About</About>}></Route> 
        </Routes>
        </Layout>
      </Router>
  );
}

export default App;
