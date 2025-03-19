import { useState, useEffect } from "react";

const GenreFilter = ({ onGenreChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // API hívás a műfajok listájához
    fetch("http://localhost:3000/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error("Hiba a műfajok lekérésénél:", error));
  }, []);

  return (
    <div>
      <label>Válassz műfajt: </label>
      <select onChange={(e) => onGenreChange(e.target.value)}>
        <option value="">-- Összes műfaj --</option>
        {genres.map((genre) => (
          <option key={genre.genreId} value={genre.genreIid}>
            {genre.genreName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;