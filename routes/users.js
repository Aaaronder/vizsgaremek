import express from 'express';
import * as db from '../src/config/db.js';

const router = express.Router();

export const routes = express.Router();

/*router.get('/', async (req, res) => {
    let ocUsers = await db.getUsers();
    res.header('Content-Type', 'application/json');
    res.status(201).send(ocUsers);
});*/

router.get('/:userId', async (req, res) => {
    let ocUser = await db.getUser(req.params.uazon);
    res.header('Content-Type', 'application/json');
    res.status(201).send(ocUser);
});

router.post('/register', async (req, res) => {
    console.log(req.body);
    let newUser = await db.insertUser(req.body);
    res.header('Content-Type', 'application/json');
    res.status(201).send(newUser);
});