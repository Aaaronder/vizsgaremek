import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import BrowsePage from './pages/browsePage/browsePage.jsx'
import UploadPage from './pages/uploadPage/uploadPage.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="appocska">
          <Routes>
            <Route path="/browsepage" element={<BrowsePage />} />
            <Route path="/uploadpage" element={<UploadPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App