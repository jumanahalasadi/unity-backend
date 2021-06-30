// Defining game stream item routes
const express = require('express');
const {
    addGameStreamItem,
    getAllGameStreamItems,
    getGameStreamItem,
    updateGameStreamItem,
    deleteGameStreamItem
} = require('../controllers/gameItemStreamController');

const router = express.Router();

// POST - Add New Game Stream Item
router.post('/game', addGameStreamItem);

// GET - One Game Stream Item
router.get('/game/:id', getGameStreamItem);

// GET - All Game Stream Items
router.get('/games', getAllGameStreamItems);

// PUT - Update one Game Stream Item
router.put('/game/:id', updateGameStreamItem);

// DELETE - Delete one Game Stream Item
router.delete('/game/:id', deleteGameStreamItem);

module.exports = {
    routes: router
}