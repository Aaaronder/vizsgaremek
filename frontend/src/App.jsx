import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import BrowsePage from './pages/browsePage/browsePage.jsx'
import UploadPage from './pages/uploadPage/uploadPage.jsx'
import SignUpPage from './pages/auth/signupPage/signUp.jsx'
import SignInPage from './pages/auth/signinPage/signIn.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/browsepage" element={<BrowsePage />} />
            <Route path="/uploadpage" element={<UploadPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App