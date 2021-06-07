const express = require('express');
const app = express();
const db = require('./queries');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.json({ message: "Eureka it worked!" });
});
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});

