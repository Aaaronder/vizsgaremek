import express from 'express';
import pool from '../config/db.js';
import upload from '../utils/fileStorage.js';
import path from 'path';
import { fileURLToPath } from 'url';

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

// ÚJ: Fájlfeltöltés kezelése
router.post('/', 
  upload.fields([
    { name: 'songFile', maxCount: 1 },  // MP3
    { name: 'songImage', maxCount: 1 }  // Kép
  ]), 
  async (req, res) => {
    try {
      // 1. Fájlok elérési útjai
      const songPath = req.files['songFile'][0].path.replace(/\\/g, '/');
      const songImage = req.files['songImage'][0].path.replace(/\\/g, '/');

      // 2. Szöveges adatok (pl. Postman vagy frontend)
      const { songName, artistId, albumId, genreId } = req.body;

      // 3. Adatbázisba mentés
      const [result] = await pool.query(
        `INSERT INTO songs 
         (songName, artistId, albumId, genreId, songUploaderId, songPath, songImage) 
         VALUES (?, ?, ?, ?, 1, ?, ?)`, // 1 = ideiglenes userID
        [songName, artistId, albumId, genreId, songPath, songImage]
      );

      res.json({ 
        songId: result.insertId, 
        songName,
        songPath,  // visszaküldjük az elérési utat
        songImage  // visszaküldjük az elérési utat
      });
    } catch (error) {
      console.error('Feltöltési hiba:', error);
      res.status(500).json({ message: 'Fájlfeltöltés sikertelen' });
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
    console.error('Letöltési hiba:', error);
    res.status(500).send('Szerverhiba');
    console.log(filePath);
  }
});

// Router exportálása
export default router;