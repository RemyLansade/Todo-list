const express    = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// Roots
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});