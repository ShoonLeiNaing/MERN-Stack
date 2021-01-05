import './App.css';
import { Jumbotron } from 'react-bootstrap'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Header from './components/header/Header';
import Layout from './layout/Layout';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
