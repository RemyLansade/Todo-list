const express    = require('express');
const bodyParser = require('body-parser');
const ejs        = require('ejs');

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Roots
app.get('/', (req, res) => {
    res.render('./pages/index');
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});