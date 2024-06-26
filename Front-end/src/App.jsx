import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


// import DayTimePicker from '@mooncake-dev/react-day-time-picker';

import MyCalendar from './components/GoogleCalendar.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login1 from './components/Login'
import Home from './components/Home';
import PrivateRoute from "./helpers/privateRoute";

function App() {
  const [authState, setAuthState] =useState(false)
  const [user, setUser] = useState(null);
  console.log(authState)
  return (
    <div className="min-h-[100vh] position-relative w-100 flex flex-col justify-between">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login1 setAuthState={setAuthState} setUser={setUser}/>} />
        
        <Route element={<PrivateRoute isAuth={authState} user={user}/>} >             
          <Route path='/dashboard/booking-types' element={<Home user={user} setAuthState={setAuthState} setUser={setUser}/>} /> 
          <Route path='/google-calendar' element={<MyCalendar />} />
         
  
        </Route>
        <Route path="/*" element={<Navigate to="/login" />} />
  
      </Routes>
    </BrowserRouter>
  </div>
  
    
 
  );
}

export default App;