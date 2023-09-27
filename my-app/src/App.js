import './App.css';
import SingUp from './components/Register/SingUp';
import Login from './components/Login/Login';
import Birthday from './components/Birthday/Birthday';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
	return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SingUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route> 
        <Route path="/birthday">
          <Birthday />
        </Route> 
        <Route path="/">
          <Login />
        </Route>        
      </Switch>
      </Router>
	);
}

export default App;
