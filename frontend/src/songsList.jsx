import { useEffect, useState } from "react";

function SongsList() {
    const [songs, setSongs] = useState([]);  // Az adatokat tárolja
    const [search, setSearch] = useState(""); // A keresési mező állapota

    // Adatok lekérése az API-ból
    useEffect(() => {
        fetch(`http://localhost:3000/songs?search=${search}`)
            .then((response) => response.json())
            .then((data) => setSongs(data))
            .catch((error) => console.error("Hiba:", error));
    }, [search]); // Ha változik a keresési érték, újra fut

    return (
        <div>
            <h2>Dalok listája</h2>
            <input
                type="text"
                placeholder="Keresés cím alapján..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Az input változása esetén frissítjük a state-et
            />
            <ul>
                {songs.length > 0 ? (
                    songs.map((song) => (
                        <li key={song.id}>{song.title} - {song.artist}</li>
                    ))
                ) : (
                    <p>Nincs találat a keresésre.</p>
                )}
            </ul>
        </div>
    );
}

export default SongsList;
