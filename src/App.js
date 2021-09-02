import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';

import Admin from './admin/Admin';
import User from './user/User';
import User1 from'./user/User1';
import Login from './common/start/Login';
import Landing  from './common/start/Landing';

const App = () => {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/user" component={User}/>
          <Route path="/user1" component={User1}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    );
};

export default App;
