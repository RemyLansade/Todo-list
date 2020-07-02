const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const _          = require('lodash');
// Import date.js module
const date       = require(__dirname +'/date.js');

const app = express();
const port = 3000;


// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// Init mongoose
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });

const itemSchema = {
    name: String,
};

const Item     = mongoose.model('Item',     itemSchema);
const WorkItem = mongoose.model('WorkItem', itemSchema);

// const item1 = new Item({
//     name: "Welcome to your todolist!"
// });
// const item2 = new Item({
//     name: "Hit the + button to add a new item"
// });
// const item3 = new Item({
//     name: "<-- Hit this to delete an item"
// });
// const item4 = new Item({
//     name: "It's a work items"
// });

// Item.insertMany([item1, item2, item3], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved default 'item' to DB.");
//     }
// });

// WorkItem.create(item4, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved defaut 'work item' to DB.");
//     }
// });


// Roots
app.get('/', (req, res) => {
    // Utilisation de "Lodash" pour mettre une majuscule au jour
    const day = _.upperFirst(date.getDay());

    Item.find({}, function(err, foundItems){
        if (err) {
            console.log(err);
        } else {
            res.render('./pages/index', {listTitle: day, items : foundItems});
        }
    });

    
});

app.post('/', (req, res) => {

    const name = req.body.newItem;

    if (req.body.list === 'Work') {

        WorkItem.create({name: name}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully saved 'work item' to DB");
                res.redirect('/work');
            }
        });

    } else {

        Item.create({name: name}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully saved 'item' to DB");
                res.redirect('/');
            }
        });
    }
});


app.get('/work', (req,res) => {

    WorkItem.find({}, function(err, foundItems){
        if (err) {
            console.log(err);
        } else {
            res.render('./pages/index', { listTitle : 'Work', items : foundItems});
        }
    });
});


// Server port
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});