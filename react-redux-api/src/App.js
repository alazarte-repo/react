import Navbar from './components/Navbar';
import UsersList from './components/UsersList';
//Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Navbar></Navbar>
      <UsersList></UsersList>
    </Provider>
  );
}

export default App;
