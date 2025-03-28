import { useState } from 'react'
import './App.css'
import SongList from './components/songsList.jsx'
import NavigationBar from './components/navigationBar/navigationBar.jsx'
import Container from './components/containerThing/container.jsx'
import Footer from './components/footer/footer.jsx'
import PhoneNavBar from './components/navigationBar/phoneNavBar/phoneNavBar.jsx'

// <SongList />

/*
<NavigationBar></NavigationBar>
    <Container></Container>
    <Footer></Footer>
*/

function App() {

  return (
    <>
      <PhoneNavBar></PhoneNavBar>
    </>
  )
}

export default App