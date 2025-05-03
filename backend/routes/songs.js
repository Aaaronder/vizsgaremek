import express from 'express';
import pool from '../config/db.js';
import upload from '../utils/fileStorage.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { authenticate } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Összes zene lekérése
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM songs');
  res.json(rows);
});

// Egy adott zene lekérése
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM songs WHERE songId = ?', [req.params.id]);
  res.json(rows[0]);
});

router.post('/',
  upload.fields([
    { name: 'songFile', maxCount: 1 },
    { name: 'songImage', maxCount: 1 } 
  ]),
  async (req, res) => {
    try {
      if (!req.files || !req.files['songFile'] || !req.files['songImage']) {
        throw new Error('Hiányzó vagy érvénytelen fájlok');
      }

      console.log('Feltöltött fájlok:', req.files);
      console.log('Feltöltött fájlok:', req.body);

      const { songName, artistId: paramArtistId, artistName, albumId: paramAlbumId, albumName, genreId, userId } = req.body;

      let finalArtistId = paramArtistId;
      if (!paramArtistId && artistName) {
        const [res] = await pool.query(
          'INSERT INTO artists (artistName) VALUES (?)',
          [artistName]
        );
        finalArtistId = res.insertId;
      } 
      
      let finalAlbumId = paramAlbumId;
      if (!paramAlbumId && albumName) {
        const [res] = await pool.query(
          'INSERT INTO albums (albumName, artistId) VALUES (?, ?)',
          [albumName, finalArtistId]
        );
        finalAlbumId = res.insertId;
      }
      
      const tempSongPath = req.files['songFile'][0].path.replace(/\\/g, '/');
      const tempSongImage = req.files['songImage'][0].path.replace(/\\/g, '/');
      
      const [result] = await pool.query(
        `INSERT INTO songs 
         (songName, artistId, albumId, genreId, songUploaderId, songPath, songImage) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [songName, finalArtistId, finalAlbumId, genreId, userId, tempSongPath, tempSongImage]
      );

      const songId = result.insertId;

      const songFileExtension = path.extname(req.files['songFile'][0].originalname);
      const imageFileExtension = path.extname(req.files['songImage'][0].originalname);
      
      const newSongPath = path.join(__dirname, '../Uploads/songs', `song${songId}${songFileExtension}`);
      const newSongImagePath = path.join(__dirname, '../Uploads/images', `cover${songId}${imageFileExtension}`);
      
      fs.renameSync(tempSongPath, newSongPath);
      fs.renameSync(tempSongImage, newSongImagePath);

      const dbSongPath = `/uploads/songs/song${songId}${songFileExtension}`;
      const dbSongImage = `/uploads/images/cover${songId}${imageFileExtension}`;
      
      await pool.query(
        `UPDATE songs SET songPath = ?, songImage = ? WHERE songId = ?`,
        [dbSongPath, dbSongImage, songId]
      );

      res.json({
        songId,
        songName,
        songPath: dbSongPath,
        songImage: dbSongImage
      });
    } catch (error) {
      console.error('Feltöltési hiba:', error);
      if (error.message === 'Csak MP3 fájlokat fogadunk el!') {
        res.status(400).json({ message: 'Csak MP3 fájlokat fogadunk el!' });
      } else if (error.message === 'Csak JPG fájlokat fogadunk el!') {
        res.status(400).json({ message: 'Csak JPG fájlokat fogadunk el!' });
      } else {
        res.status(500).json({ message: 'A feltöltés sikertelen.' });
      }
    }
});

// Zene módosítása
router.put('/:id', async (req, res) => {
  const { songName, artistId, albumId, genreId, songUploaderId, songPath, songImage } = req.body;
  await pool.query(
    'UPDATE songs SET songName = ?, artistId = ?, albumId = ?, genreId = ?, songUploaderId = ?, songPath = ?, songImage = ? WHERE songId = ?',
    [songName, artistId, albumId, genreId, songUploaderId, songPath, songImage, req.params.id]
  );
  res.json({ songId: req.params.id, songName });
});

// Zene törlése
router.delete('/:id', authenticate, async (req, res) => {
  const songId = req.params.id;
  const userId = req.user.userId;

  try {
    // Zene adatainak lekérése (beleértve a fájl elérési útjait)
    const [song] = await pool.query(
      'SELECT songUploaderId, songPath, songImage FROM songs WHERE songId = ?',
      [songId]
    );
    if (!song[0]) {
      return res.status(404).json({ message: 'Zene nem található' });
    }

    // Felhasználó admin jogosultságának ellenőrzése
    const [user] = await pool.query(
      'SELECT isAdmin FROM users WHERE userId = ?',
      [userId]
    );
    if (!user[0]) {
      return res.status(404).json({ message: 'Felhasználó nem található' });
    }

    // Jogosultság ellenőrzése
    if (song[0].songUploaderId !== userId && user[0].isAdmin !== 1) {
      return res.status(403).json({ message: 'Nincs jogosultság a törléshez' });
    }

    // Fájlok törlése a szerverről
    const songFilePath = path.join(__dirname, '../', song[0].songPath);
    const imageFilePath = path.join(__dirname, '../', song[0].songImage);

    // Ellenőrizzük, hogy a fájlok léteznek-e, és töröljük őket
    if (fs.existsSync(songFilePath)) {
      fs.unlinkSync(songFilePath);
    }
    if (fs.existsSync(imageFilePath)) {
      fs.unlinkSync(imageFilePath);
    }

    // Zene törlése az adatbázisból
    await pool.query('DELETE FROM songs WHERE songId = ?', [songId]);
    res.json({ message: 'Dal törölve' });
  } catch (error) {
    console.error('Törlési hiba:', error);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});

// MP3 fájl kiszolgálása
router.get('/song/:id', async (req, res) => {
  try {
    const [song] = await pool.query('SELECT songPath FROM songs WHERE songId = ?', [req.params.id]);
    if (!song[0]) {
      return res.status(404).send('A zene nem található');
    }

    const absolutePath = path.join(__dirname, '../../', song[0].songPath);
    res.sendFile(absolutePath);
  } catch (error) {
    console.error('Hiba a zene kiszolgálásánál:', error);
    res.status(500).send('Szerverhiba');
  }
});

// Borítókép kiszolgálása
router.get('/image/:id', async (req, res) => {
  try {
    const [song] = await pool.query('SELECT songImage FROM songs WHERE songId = ?', [req.params.id]);
    if (!song[0]) {
      return res.status(404).send('A borítókép nem található');
    }

    const absolutePath = path.join(__dirname, '../../', song[0].songImage);
    res.sendFile(absolutePath);
  } catch (error) {
    console.error('Hiba a kép kiszolgálásánál:', error);
    res.status(500).send('Szerverhiba');
  }
});

// MP3 letöltése
router.get('/download/:songId', async (req, res) => {
  try {
    const [song] = await pool.query('SELECT songPath, songName FROM songs WHERE songId = ?', [req.params.songId]);
    if (!song[0]) return res.status(404).send('Zene nem található');

    const filePath = path.join(__dirname, '../', song[0].songPath);
    const cleanedFileName = song[0].songName
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_') + '.mp3';

    res.download(filePath, cleanedFileName, {
      headers: {
        'Content-Disposition': `attachment; filename="${cleanedFileName}"`
      }
    });
  } catch (error) {
    console.error('Feltöltési hiba:', error);
    if (error.message === 'Csak MP3 és JPG fájlok engedélyezettek!') {
      res.status(400).json({ message: 'Csak MP3 és JPG fájlok engedélyezettek!' });
    } else {
      res.status(500).json({ message: 'Fájlfeltöltés sikertelen' });
    }
  }
});

export default router;