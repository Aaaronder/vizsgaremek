import express from 'express';
import * as db from '../src/config/db.js';

const router = express.Router();

export const routes = express.Router();

router.post('/addtoplaylist', async (req, res) => {
    let result = await db.addToPlaylist(req.body.plId, req.body.songId);
    res.header('Content-Type', 'application/json');
    res.status(201).send(result);
});

router.delete('/playlist/:plId/song/:songId', async (req, res) => {
    const { plId, songId } = req.params;
    const result = await removeFromPlaylist(plId, songId);
    res.header('Content-Type', 'application/json');
    res.status(200).send(result);
});