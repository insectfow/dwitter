import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Pachinko from '../routes/Pachinko';
import Navigation from './Navigation';

const AppRouter = ({isLoggedIn, userObj}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/"  element={<Home userObj={userObj}  />}>
            </Route>
            <Route path="/profile" element={<Profile/>}>
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