// Modúlok importálása
import express from "express";
import cors from "cors";

// Végpontok importálása
import albumRoutes from "./routes/albums.js";
import artistRoutes from "./routes/artists.js";
import genreRoutes from './routes/genres.js';
import playlistRoutes from './routes/playlists.js';
import songRoutes from './routes/songs.js';
import userRoutes from './routes/users.js';

import pool from './config/db.js';

// Express alkalmazás létrehozása
const app = express();

// Middleware-ek a kérésekhez
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API útvonalak
app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/genres', genreRoutes);
app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);
app.use('/users', userRoutes);

// Alap útvonal (testeléshez)
app.get("/", (req, res) => {
  res.json({ message: "Outclass backend is running..." });
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
