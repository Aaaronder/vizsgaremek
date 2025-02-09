import express from 'express';
import * as db from '../src/config/db.js';

const router = express.Router();

export const routes = express.Router();

router.get('/playlists', async (req, res) => {
    let playlists = await db.getPlaylists();
    res.header('Content-Type', 'application/json');
    res.status(200).send(playlists);
});

router.post('/createplaylist', async (req, res) => {
    console.log(req.body);
    let newPlaylist = await db.createPlaylist(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(newPlaylist);
});

router.delete('/deleteplaylist/:plId', async (req, res) => {
    let deletedPlaylist = await db.deletePlaylist(req.params.plId);
    res.header('Content-Type', 'application/json');
    res.status(201).send(deletedPlaylist);
});