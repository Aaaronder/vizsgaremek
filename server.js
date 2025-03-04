import express from 'express';
import cors from 'cors';
import artistRoutes from './routes/artists.mjs';
import albumRoutes from './routes/albums.mjs';
import genreRoutes from './routes/genres.mjs';
import instrumentRoutes from './routes/instruments.mjs';
import playlistRoutes from './routes/playlists.mjs';
import songRoutes from './routes/songs.mjs';
import userRoutes from './routes/users.mjs';

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/genres', genreRoutes);
app.use('/instruments', instrumentRoutes);
app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});