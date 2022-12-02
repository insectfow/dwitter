import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Pachinko from '../routes/Pachinko';
import Navigation from './Navigation';

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/"  element={<Home userObj={userObj}  />}>
            </Route>
            <Route path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj}/>}>
            </Route>
            <Route path="/pachinko" element={<Pachinko/>}>
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </>
            )  : ( <Route path="/" element={<Auth/>}></Route> )}
          </Routes>
    </Router>
  )
};

export default AppRouter;