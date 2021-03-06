import './App.css';
import { Jumbotron } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/header/Header';
import PrivateRoute from './components/HOC/PrivateRoute'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  isUserLoggedIn,getAllCategories } from './actions'
import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category'
import { getAllInitialData } from './actions/initialData.actions';

function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!auth.authenticate){
      dispatch(isUserLoggedIn())
      // return <Redirect to={`/admin/signin`} />
    }
    dispatch(getAllInitialData())
    
    
  },[])
  return (
    <div className="App">

      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products"  component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>

    </div>
  );
}

export default App;
