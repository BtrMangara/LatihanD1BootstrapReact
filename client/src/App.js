
// import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Home from './component/HomePage';

function App() {
  return (
    <div className={'container-fluid'}>
      <nav className={"navbar bg-dark-tertiary text-center"}>
      <div className={"container-fluid"}>
          <span className={"navbar-brand mb-0 h1 align-items-center"}>Hello</span>
        </div>
      </nav>  
      <Home></Home>
    </div>
  );
}

export default App;
