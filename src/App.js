import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Data from "./Components/Data/Data";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Data></Data>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
