import './App.css';
import { Jumbotron } from 'react-bootstrap'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Header from './components/header/Header';
import  PrivateRoute from './components/HOC/PrivateRoute'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { login,isUserLoggedIn } from './actions/auth.actions'
import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';

function App() {
      const auth = useSelector(state=>state.auth)
      const dispatch = useDispatch()
      useEffect(() => {
        if(!auth.authenticate)
            dispatch(isUserLoggedIn())
    }, [])
  return (
    <div className="App">
    
        <Switch>
          <PrivateRoute path="/" exact component={Home}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin} />
        </Switch>

    </div>
  );
}

export default App;
