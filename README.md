
# Unity Game Listings App: Back-end

An express app, with a REST API service to fetch and save game listings. The app works with Firebase and Cloud Storage.

The back-end is built with the following technologies:

	* node.js
    * express.js 
    * multer
    * firebase firestore
    * google cloud storage / firebase storage

## Table of Contents
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Environment Setup](#environment-setup)
- [Folder Structure](#folder-structure)
- [Database](#database)
- [API](#api)
- [Contributors](#contributors)


## Setup

* clone the repository and `cd` into the directory
* `npm install`

## Running the Application

### Pre-requisites

In order for this app to work completely, the configuration keys for Firebase must be present in the .env file. The database is hosted on Firebase, there is no local set up required. 

Run the following command: 
```npm start```

This runs the express app on port 8080. The app will be available for incoming requests.

## Environment Setup

The .env file will need to be populated with environment variables configuration to connect to Firebase, please obtain the environment keys from the doc in the email. 

## Docker

To build the image:
```docker build -t node-backend . ```

To run with environment variables:
```
docker run \
-it --rm -d \
--name node-backend \
-p 9000:8080 \
-e PORT=8080 \
-e HOST=localhost \
-e HOST_URL= \
-e API_KEY= \
-e AUTH_DOMAIN= \
-e DATABASE_URL= \
-e PROJECT_ID= \
-e STORAGE_BUCKET= \
-e MESSAGING_SENDER_ID= \
-e APP_ID= \
node-backend
```

## Folder Structure

Folders:
- controllers: contains two files, asynchronous functions to update firebase (crud operations) for both gameStreamItem and imageUpload
- models: contains two models, one for gameStreamItem and one for imageUpload which is the shape of our data to be stored in the database
- routes: defines the GET, POST, PUT, DELETE endpoints for gameStreamItem and imageUpload

Important files:
- config.js: exports our configuration from .env to db.js to connect to firebase
- db.js: initializes firebase with provided config
- index.js: sets up the express app with multer and adds routes


## Database
The database used in this project is Firebase, and all configuration points to a serverless Firebase setup on Google Cloud. 

The database should be available with an internet connection and all configuration provided in the .env file. 

### Firebase Firestore Database
Stores the collections "gameStreamItems" as JSON objects and stores references to uploaded images in the "images" collection.

### Firebase Storage
Stores uploaded images in a storage bucket and returns the public URL for reference in the database.


## API

### Game Stream Items Endpoints

POST - Add New Game Stream Item
```router.post('/game', addGameStreamItem);```

GET - One Game Stream Item
```router.get('/game/:id', getGameStreamItem);```

GET - All Game Stream Items
```router.get('/games', getAllGameStreamItems);```

PUT - Update one Game Stream Item
```router.put('/game/:id', updateGameStreamItem);```

DELETE - Delete one Game Stream Item
```router.delete('/game/:id', deleteGameStreamItem);```


### Image Upload Endpoints

POST - Add Image to Cloud Storage
```router.post('/upload', upload, addImage);```



## Contributors
Jumanah Al Asadi
jumanahalasadi@gmail.com