import express from 'express';
import * as db from '../src/config/db.js';

const router = express.Router();

export const routes = express.Router();

router.post('/uploadsong', async (req, res) => {
    console.log(req.body);
    let newSong = await db.uploadSong(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(newSong);
});

router.get('/downloadsong/:songId', async (req, res) => {
    try {
        console.log(req.params);
        let song = await db.downloadSong(req.params.songId);

        if (song.length === 0) {
            return res.status(404).send({error: "File not found"});
        }

        res.download(song[0].songPath, (err) => {
            if (err) {
                res.status(500).send({error: "File download failed"});
            }
        });
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).send({error: "Internal Server Error"});
    }
});