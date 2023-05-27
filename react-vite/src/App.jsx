import Title from './components/Title';
import Button from './components/Button';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Link, Outlet, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Characters from './pages/Characters';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);
  console.log(count);
  
  useEffect(() => {
    console.log("useEffect is working, just when count var was changed: ");
  },[count]);

  return (
  <div className='App'>
    <Title></Title>
    <Title text="Texto del componente 2"></Title>
    <Title text="Texto del componente 3"></Title>
    <Button text="Click me" onClick={() => {setCount(count+1)}}></Button>
    <Button text={`Number of clicks: ${count}`} onClick={() => {alert('Second button was clicked')}}></Button>

    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/characters" element={<Characters></Characters>}></Route>
        </Route>
      </Routes>
    </Router>
  </div>
  )
}

function Layout() {
  return(
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/characters">Characters</Link>
    </nav>
    <Outlet></Outlet>
    </>
  )
}

export default App
