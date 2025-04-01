import { useState } from 'react'
import './App.css'
import SongList from './components/songsList.jsx'
import NavigationBar from './components/navigationBar/navigationBar.jsx'
import Container from './components/containerThing/container.jsx'
import Filter from './components/filterButton/filterButton.jsx'
import SongContainer from './components/songContainer/songContainer.jsx'

function App() {

  return (
    <>
      <NavigationBar></NavigationBar>
      <Filter></Filter>
      <SongContainer></SongContainer>
    </>
  )
}

export default App