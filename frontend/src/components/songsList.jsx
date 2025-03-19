import { useEffect, useState } from "react";
import InstrumentFilter from "./instrumentFilter.jsx";
import GenreFilter from "./genreFilter.jsx";
import ArtistFilter from "./artistFilter.jsx";

function SongsList() {
    const [songs, setSongs] = useState([]);  // Az adatokat tárolja
    const [search, setSearch] = useState(""); // A keresési mező állapota
    const [selectedInstrument, setSelectedInstrument] = useState("");
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedArtist, setSelectedArtist] = useState("");
    

    // Adatok lekérése az API-ból
    useEffect(() => {
        fetch(`http://localhost:3000/songs?search=${search}`)
            .then((response) => response.json())
            .then((data) => setSongs(data))
            .catch((error) => console.error("Hiba:", error));
    }, [search]); // Ha változik a keresési érték, újra fut

    // Szűrés a hangszer alapján
    const filterSongsByInstrument = (instrumentId) => {
        setSelectedInstrument(instrumentId);

        if (instrumentId) {
            // Ha van választott hangszer, szűrjük a zenéket az instrumentId alapján
            const filtered = songs.filter((song) => song.instrumentId === parseInt(instrumentId));
            setFilteredSongs(filtered);
        } else {
            // Ha nincs választott hangszer, minden dalt visszaadunk
            setFilteredSongs(songs);
        }
    };

    // Szűrés a hangszer alapján
    const filterSongsByGenre = (genreId) => {
        setSelectedGenre(genreId);

        if (genreId) {
            // Ha van választott hangszer, szűrjük a zenéket az instrumentId alapján
            const filtered = songs.filter((song) => song.genreId === parseInt(genreId));
            setFilteredSongs(filtered);
        } else {
            // Ha nincs választott hangszer, minden dalt visszaadunk
            setFilteredSongs(songs);
        }
    };

    return (
        <div>

            <InstrumentFilter onInstrumentChange={filterSongsByInstrument} />
            <GenreFilter onGenreChange={filterSongsByGenre} />

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
                        <li key={song.songId}>{song.songName} - {song.artistId}</li>
                    ))
                ) : (
                    <p>Nincs találat a keresésre.</p>
                )}
            </ul>

            <h4>Hangszerek szűrt lista</h4>
            <ul>
                {filteredSongs.length > 0 ? (
                    filteredSongs.map((song) => (
                        <li key={song.songId}>
                            <strong>{song.songName}</strong> - {song.artistId}
                        </li>
                    ))
                ) : (
                    <p>Nincs elérhető zenek a kiválasztott hangszerhez.</p>
                )}
            </ul>
        </div>
    );
}

export default SongsList;