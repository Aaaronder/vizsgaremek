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

router.get('/downloadsong/:songId')