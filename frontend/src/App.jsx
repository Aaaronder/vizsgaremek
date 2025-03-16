import { useEffect, useState } from "react";
import SongsList from "./songsList.jsx"

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/songs")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Hiba:", error));
  }, []);

  return (
    <div>
      <h1>Üdv az Outclass frontendjén!</h1>
      <SongsList />
    </div>
  );
}

export default App;