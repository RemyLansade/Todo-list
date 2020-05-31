const express    = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let items = ["Buy food", "Cock food", "Eat food"];
let workItems = [];


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
        weekday : 'long',
        day : 'numeric',
        month : 'long'
    };
    const currentDay = todayId.toLocaleDateString('en-US', options);

    res.render('./pages/index', {listTitle: currentDay, items : items});
});

app.post('/', (req, res) => {
    console.log(req.body);
    
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