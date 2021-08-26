import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';

import Admin from './admin/Admin';
import User from './user/User';
import Login from './common/start/Login';
import Join from './common/join/Join';
import Landing  from './common/start/Landing';
import FindPw from './common/find/FindPw';
import FindPwRes from './common/find/FindPwRes';

const App = () => {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/user" component={User}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/join" component={Join}/>
          <Route exact path="/find_pw" component={FindPw}/>
          <Route exact path="/find_pw_res" component={FindPwRes}/>
        </Switch>
      </div>
    );
};

export default App;
