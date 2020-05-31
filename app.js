const express    = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let items = ["Buy food", "Cock food", "Eat food"];


// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// Roots
app.get('/', (req, res) => {
    
    const todayId  = new Date();
    const options = {
        weekday : 'long'
    };
    const currentDay = todayId.toLocaleDateString('en-US', options);

    res.render('./pages/index', {currentDay: currentDay, items : items});
});

app.post('/', (req, res) => {
    const item = req.body.newItem;
    items.push(item);

    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});