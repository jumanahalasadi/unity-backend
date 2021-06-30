'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();
require("firebase/storage");
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");

const ImageUpload = require('../models/image');

// Add Image to Storage and return the file path
// https://firebase.google.com/docs/storage/web/upload-files#web-v8_1
const addImage = async (req, res) => {
    const defaultType = 1; // TO-DO
    try {
        // Grab the file
        const file = req.file;

        // Format the filename
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${type}`;

        try {
            // Create reference for file name in cloud storage 
            const imageRef = storage.child(fileName);

            // Upload the file in the bucket storage
            const snapshot = await imageRef.put(file.buffer);
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            // Upload file to images collection just as a reference (optional)
            const tempImageData = {url: downloadURL, type: defaultType}
            const doc = await firestore.collection('images').add(tempImageData);
            const docId = doc.id; 

            // Return image url with id to client
            const imageData = new ImageUpload(docId, downloadURL, defaultType)
            res.send(imageData);

        } catch (error) {
            res.status(400).send(error.message);
        }

    } catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}


module.exports = {
    addImage
}
