import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/Shared/Navigation/Navigation";
import "./App.css";
 
import Authenticate from "./pages/authenticate/Authenticate";
import Activate from "./pages/activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import Room from "./pages/Room/Room";




const App = () => {


  

const {user,isAuth}=useSelector(state=>state.auth)

  return (
    <Router>
      <Navigation />

      {/* // ye ...ye krta he ki..... agar hume koi route mil gya to ye further search discontinue kr deta he */}
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute isAuth={isAuth}>
              <Home />
            </GuestRoute>
          }
        />
 

        <Route
          path="/authenticate"
          element={
            <GuestRoute isAuth={isAuth}>
              <Authenticate />
            </GuestRoute>
          }
        />

<Route path="/activate"   element={<SemiProtected isAuth={isAuth}  activated={user.activated}      >

  <Authenticate/>
</SemiProtected>} />



<Route path="/rooms" element={<Protected  activated={user.activated}  isAuth={isAuth}  >
<Rooms/>
</Protected>}
   />

<Route path="/room/:id" element={<Protected  activated={user.activated}  isAuth={isAuth}  >
<Room/>
</Protected>}
   />

      </Routes>
    </Router>
  );
};

function GuestRoute({ isAuth, children }) {
  if (isAuth) {
    return <Navigate to="/rooms" replace />;
  }
  return children;
}
function SemiProtected({ isAuth, children,activated }) {
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
 else if(isAuth && !activated){
return children
 }
 return <Navigate  to="/rooms" replace />
}

function Protected({ isAuth, children,activated }) {
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
 else if(isAuth && !activated){
return <Navigate  to="/activate" replace />
}
 
 return children
}
export default App;
