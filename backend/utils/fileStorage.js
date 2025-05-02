import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// __dirname pótlása
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fájlok mentése az uploads mappába
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    if (file.mimetype === 'audio/mpeg') {
      uploadPath = path.join(__dirname, '../Uploads/songs');
    } else if (file.mimetype === 'image/jpeg') {
      uploadPath = path.join(__dirname, '../Uploads/covers');
    } else {
      return cb(new Error('Nem támogatott fájltípus'), null);
    }

    // Ha a mappa nem létezik, hozd létre
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Csak MP3 és JPG engedélyezése, specifikus hibaüzenetekkel
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'songFile' && file.mimetype !== 'audio/mpeg') {
    cb(new Error('Csak MP3 fájlokat fogadunk el!'), false);
  } else if (file.fieldname === 'songImage' && file.mimetype !== 'image/jpeg') {
    cb(new Error('Csak JPG fájlokat fogadunk el!'), false);
  } else {
    cb(null, true);
  }
};

export default multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB-es limit
});