import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import { UserProvider } from './context/UserContext'; // ÚJ

import BrowsePage from './pages/browsePage/browsePage.jsx';
import UploadPage from './pages/uploadPage/uploadPage.jsx';
import SignUpPage from './pages/auth/signupPage/signUp.jsx';
import SignInPage from './pages/auth/signinPage/signIn.jsx';
import AccountPage from './pages/account/account.jsx';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
