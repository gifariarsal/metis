import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import EmailVerification from './pages/EmailVerification';
import WriteBlog from './pages/WriteBlog';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/user-profile' element={<UserProfile />} />
      <Route path='/email-verification' element={<EmailVerification />} />
      <Route path='/write-blog' element={<WriteBlog />} />
      <Route path='/reset-password' element={<ResetPassword />} />
    </Routes>
    </>
  );
}

export default App;
