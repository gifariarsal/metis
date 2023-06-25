import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import EmailVerification from './pages/EmailVerification';
import WriteBlog from './pages/WriteBlog';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/verification/:token" element={<EmailVerification />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;
