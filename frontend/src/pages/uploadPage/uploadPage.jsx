//import { useState, useEffect } from 'react'
//import axios from 'axios'

import NavigationBar from  '../../mainComp/navigationBar/navigationBar.jsx'
import UploadContainer from  './components/uploadContainer/uploadContainer.jsx'

function App() {

  return (
    <>
      <div>
        <NavigationBar></NavigationBar>
        <UploadContainer></UploadContainer>
      </div>
    </>
  )
}

export default App