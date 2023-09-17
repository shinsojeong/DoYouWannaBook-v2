import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';

import Admin from './admin/Admin';
import User from './user/User';
import User1 from'./user/User1';
import Login from './common/start/Login';
import Landing  from './common/start/Landing';

export default function App () {
    return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/user/*" element={<User/>}/>
          <Route path="/user1/*" element={<User1/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </div>
    );
}