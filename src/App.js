import './App.css';
import Home from './components/Todos/home';
import Todoprovider from './store/Todoprovider';

function App() {
  return (
<Todoprovider>
<Home></Home>
</Todoprovider>

  );
}

export default App;
