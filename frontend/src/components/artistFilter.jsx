import { useState, useEffect } from "react";

const ArtistFilter = ({ onArtistChange }) => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // API hívás az előadók listájához
    fetch("http://localhost:3000/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((error) => console.error("Hiba az előadók lekérésénél:", error));
  }, []);

  return (
    <div>
      <label>Válassz előadót: </label>
      <select onChange={(e) => onArtistChange(e.target.value)}>
        <option value="">-- Összes előadó --</option>
        {artists.map((artist) => (
          <option key={artist.artistId} value={artist.artistId}>
            {artist.artistName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ArtistFilter;