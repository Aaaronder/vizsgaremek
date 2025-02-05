import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Betölti a .env fájlban lévő változókat
dotenv.config(); 

const app = express();
app.use(express.json());

// A PORT változót használja, vagy alapértelmezettként a 3000-es portot
const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(`A szerver elindult a http://localhost:${port} porton.`);
});