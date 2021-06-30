'use strict';
require("firebase/storage");
const firebase = require('../db');
const firestore = firebase.firestore();

const GameStreamItem = require('../models/gameStreamItem');

// Add one gameStreamItem to our collection
const addGameStreamItem = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await firestore.collection('gameStreamItems').doc().set(data); 
        res.send('Record added!')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Get one GameStreamItem from our DB
const getGameStreamItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await firestore.collection('gameStreamItems').doc(id);
        const data = await result.get();
        if (!data.exists) {
            res.status(400).send("No game title with this id was found");
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Get GameStreamItems from our DB
const getAllGameStreamItems = async (req, res, next) => {
    try {
        const gameItems = await firestore.collection('gameStreamItems');
        const data = await gameItems.get();
        let gameItemsArray = [];
        if (data.empty) {
            res.status(400).send("No game tiles found");
        } else {
 
            // mapping to our GameStreamItem model
            data.forEach( doc => {
                const tempItem = new GameStreamItem (
                    doc.id,
                    doc.data()
                );
                gameItemsArray.push(tempItem);
            })

            // Send back the array of listings
            let formatted = { listings: gameItemsArray}
            res.send(formatted);

        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Update one GameStreamItem from our DB (Optional)
const updateGameStreamItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const currentItem = await firestore.collection('gameStreamItems').doc(id);
        
        if (!currentItem) {
            res.status(400).send("Cannot update. No game title with this id was found");
        } else {
            const result = await currentItem.update(updatedData);
            res.send("Updated successfully");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


// Delete one GameStreamItem from our DB (Optional)
const deleteGameStreamItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await firestore.collection('gameStreamItems').doc(id).delete();
        res.send("Deleted successfully");

    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addGameStreamItem,
    getAllGameStreamItems,
    getGameStreamItem,
    updateGameStreamItem,
    deleteGameStreamItem
}
