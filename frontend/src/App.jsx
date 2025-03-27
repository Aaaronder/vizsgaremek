import { useState } from 'react'
import './App.css'
import SongList from './components/songsList.jsx'
import NavigationBar from './components/navigationBar/navigationBar.jsx'
import Container from './components/containerThing/container.jsx'
import Footer from './components/footer/footer.jsx'

function App() {

  return (
    <>
    <NavigationBar></NavigationBar>
    <h1>Outclass</h1>
    <SongList />
    <Container></Container>
    <Footer></Footer>
    </>
  )
}

export default App