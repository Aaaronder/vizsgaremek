import multer from 'multer';
import path from 'path';

// Fájlok mentése az uploads mappába
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg') {
      cb(null, path.join(__dirname, '../uploads/songs')); // MP3 a songs mappába
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(__dirname, '../uploads/covers')); // Képek az images mappába
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName); // Pl.: "1234567890-123456789.mp3"
  }
});

// Csak MP3 és képek engedélyezése
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mpeg' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Csak MP3 és képfájlok engedélyezettek!'), false);
  }
};

export default multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB-es limit
});