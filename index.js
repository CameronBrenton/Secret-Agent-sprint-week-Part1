//
// Title: Top-secret government agent messaging system
// This is a sprint week project using node.js, express http, and datastructures.
// Created By Jacob Sheppard and Cameron Brenton. 
//


const express = require('express');
const app = express();
const db = require('./queries');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/save/stack', db.postMessageStack);
app.get('/retrieve/stack', db.getMessageStack);
app.get('/retrieve/queue', db.getMessageQueue);
app.get('/retrieve/allMessagesPosted', db.getMessagesPostedByAgentId);


app.get('/', (request, response) => {
    response.json({ message: "Good day agent! I hope you are doing well" });
});
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});

