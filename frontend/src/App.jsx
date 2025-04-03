import { useState } from 'react'
import './App.css'
import SongList from './components/songsList.jsx'
import NavigationBar from './components/navigationBar/navigationBar.jsx'
import Container from './components/containerThing/container.jsx'
import Filter from './components/filterButton/filterButton.jsx'
import SongContainer from './components/songContainer/songContainer.jsx'
import FilterBar from './components/filterBar/filterBar.jsx'
import Footer from './components/footer/footer.jsx'

//      <FilterBar onFilterChange={setFilters}></FilterBar>

function App() {

  return (
    <>
      <NavigationBar></NavigationBar>
      <Filter></Filter>
      <FilterBar></FilterBar>
      <SongContainer></SongContainer>
      <Footer></Footer>
    </>
  )
}

export default App