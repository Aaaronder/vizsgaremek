import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import BrowsePage from './pages/browsePage/browsePage.jsx'
import UploadPage from './pages/uploadPage/uploadPage.jsx'
import SignUpPage from './pages/auth/signupPage/signUp.jsx'
import SignInPage from './pages/auth/signinPage/signIn.jsx'
import AccountPage from './pages/account/account.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App