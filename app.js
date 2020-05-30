const express    = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({extended: true}));


// Roots
app.get('/', (req, res) => {
    res.send('Hello world');
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});