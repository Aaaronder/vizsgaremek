import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import BrowsePage from './pages/browsePage/browsePage.jsx'
import UploadPage from './pages/uploadPage/uploadPage.jsx'
import LoginPage from './pages/loginPage/loginPage.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/browsepage" element={<BrowsePage />} />
            <Route path="/uploadpage" element={<UploadPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App