import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/user-profile' element={<UserProfile />} />
    </Routes>
    </>
  );
}

export default App;
