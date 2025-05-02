import express from 'express';
import pool from '../config/db.js';
import upload from '../utils/fileStorage.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express router az útvonalak kezelésére
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
      // Multer hiba ellenőrzése
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
      
      // 1. Adatbázisba mentés (ideiglenes elérési utakkal)
      const tempSongPath = req.files['songFile'][0].path.replace(/\\/g, '/');
      const tempSongImage = req.files['songImage'][0].path.replace(/\\/g, '/');
      
      const [result] = await pool.query(
        `INSERT INTO songs 
         (songName, artistId, albumId, genreId, songUploaderId, songPath, songImage) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [songName, finalArtistId, finalAlbumId, genreId, userId, tempSongPath, tempSongImage]
      );

      const songId = result.insertId;

      // 2. Fájlok átnevezése songId alapján
      const songFileExtension = path.extname(req.files['songFile'][0].originalname);
      const imageFileExtension = path.extname(req.files['songImage'][0].originalname);
      
      const newSongPath = path.join(__dirname, '../Uploads/songs', `song${songId}${songFileExtension}`);
      const newSongImagePath = path.join(__dirname, '../Uploads/images', `cover${songId}${imageFileExtension}`);
      
      // Fájlok átnevezése
      fs.renameSync(tempSongPath, newSongPath);
      fs.renameSync(tempSongImage, newSongImagePath);

      // 3. Az adatbázisban frissítjük az elérési utakat a kívánt formátummal
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
      if (error.message === 'Please note that we only accept MP3 files.') {
        res.status(400).json({ message: 'Please note that we only accept MP3 files.' });
      } else if (error.message === 'Please note that we only accept JPG files.') {
        res.status(400).json({ message: 'Please note that we only accept JPG files.' });
      } else {
        res.status(500).json({ message: 'The upload was unsuccessfull.' });
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
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM songs WHERE songId = ?', [req.params.id]);
  res.json({ message: 'Dal törölve' });
});

// MP3 fájl kiszolgálása
router.get('/song/:id', async (req, res) => {
  try {
    // 1. Lekérjük a zenét az adatbázisból
    const [song] = await pool.query('SELECT songPath FROM songs WHERE songId = ?', [req.params.id]);
    if (!song[0]) {
      return res.status(404).send('A zene nem található');
    }

    // 2. Összerakjuk a fájl abszolút elérési útját
    const absolutePath = path.join(__dirname, '../../', song[0].songPath);

    // 3. Visszaküldjük a fájlt
    res.sendFile(absolutePath);
  } catch (error) {
    console.error('Hiba a zene kiszolgálásánál:', error);
    res.status(500).send('Szerverhiba');
  }
});

// Borítókép kiszolgálása
router.get('/image/:id', async (req, res) => {
  try {
    // 1. Lekérjük a zenét az adatbázisból
    const [song] = await pool.query('SELECT songImage FROM songs WHERE songId = ?', [req.params.id]);
    if (!song[0]) {
      return res.status(404).send('A borítókép nem található');
    }

    // 2. Összerakjuk a fájl abszolút elérési útját
    const absolutePath = path.join(__dirname, '../../', song[0].songImage);

    // 3. Visszaküldjük a fájlt
    res.sendFile(absolutePath);
  } catch (error) {
    console.error('Hiba a kép kiszolgálásánál:', error);
    res.status(500).send('Szerverhiba');
  }
});

// MP3 letöltése (a browser letölti, nem játssza le)
router.get('/download/:songId', async (req, res) => {
  try {
    // 1. Zene adatainak lekérése az adatbázisból
    const [song] = await pool.query('SELECT songPath, songName FROM songs WHERE songId = ?', [req.params.songId]);
    if (!song[0]) return res.status(404).send('Zene nem található');

    // 2. Fizikai elérési út összeállítása
    const filePath = path.join(__dirname, '../', song[0].songPath);

    // 3. Fájlnév tisztítása (eltávolítjuk az ékezeteket, szóközöket)
    const cleanedFileName = song[0].songName
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Ékezetek eltávolítása
      .replace(/\s+/g, '_') + '.mp3'; // Szóközök aláhúzásra cserélése

    // 4. Letöltés kényszerítése a fejlécekkel
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

// Router exportálása
export default router;