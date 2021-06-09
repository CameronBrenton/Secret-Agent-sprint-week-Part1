const express = require('express');
const app = express();
const db = require('./queries');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/save/stacks', db.postAgent);
app.get('/retrieve/stacks', db.getAgent);


// CRUD - Create (save, post), Retrieve (get, fetch), Update (modify, put), Delete (remove, purge, prune)

/*
 Problem 1 - create a service with 2 endpoints -> save and retrieve (stack) LIFO
 Problem 2 - create a service with 2 endpoints -> save and retrieve (queue) FIFO

 Pseudocode/Algorithm
    app.post /save/stacks (save) - 
      |_ stack (push)
        |_ database insert into postgres
    app.get /xyz (retrieve) - stack ()

*/

app.get('/', (request, response) => {
    response.json({ message: "Eureka it worked!" });
});
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});

