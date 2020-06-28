const express    = require('express');
const bodyParser = require('body-parser');
const _          = require('lodash');
// Import date.js module
const date       = require(__dirname +'/date.js');

const app = express();
const port = 3000;

const items = ["Acheter à manger", "Cuisiner", "Manger"];
const workItems = [];


// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// Roots
app.get('/', (req, res) => {
    // Utilisation de "Lodash" pour mettre une majuscule au jour
    const day = _.upperFirst(date.getDay());

    res.render('./pages/index', {listTitle: day, items : items});
});

app.post('/', (req, res) => {
    const item = req.body.newItem;

    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', (req,res) => {
    res.render('./pages/index', {listTitle : 'Work', items : workItems});
});


// Server port
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});