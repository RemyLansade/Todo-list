const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const _          = require('lodash');
// Import date.js module
const date       = require(__dirname +'/date.js');

const app = express();
const port = 3000;

const day        = _.capitalize(date.getDay());


// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// Init mongoose
mongoose.connect('mongodb+srv://admin-remy:admin@cluster0.8w725.mongodb.net/todolistDB', { 
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

//--------------------- Item Schema ----------------------------//

const itemSchema = {
    name: String,
};

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
    name: "Bienvenue dans votre Todo-liste !"
});
const item2 = new Item({
    name: "Clique sur le bouton + pour ajouter"
});
const item3 = new Item({
    name: "<-- Coche pour supprimer"
});
const defaultItems = [item1, item2, item3];

//--------------------- List Schema ----------------------------//

const listSchema = {
    name: String,
    items: [itemSchema]
}

const List = mongoose.model('List', listSchema);

//--------------------------------------------------------------//

// Roots
app.get('/', (req, res) => {

    Item.find({}, function(err, foundItems){
        if (!err) {
            if (foundItems.length === 0){
                Item.insertMany(defaultItems, function (err) {
                    if (!err) {
                        console.log("Successfully saved 'default item' to DB.");
                        res.redirect('/');
                    } else {
                        console.log(err);
                    }
                });
            } else {
                res.render('./pages/index', {listTitle: day, items : foundItems});
            }
        } else {
            console.log(err);
        }
    });
});


app.get('/:customListName', function(req,res) {

    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                const list = new List ({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect(`/${customListName}`);
            } else {
                res.render('./pages/index', {listTitle: foundList.name, items: foundList.items});
            }
        } else {
            console.log(err);
        }
    })    
});


app.post('/', (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name : itemName
    });

    if (listName === day) {

        item.save();
    
        console.log(`Successfully saved '${day} item' to DB.`);
        res.redirect('/');

    } else {
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();

            console.log(`Successfully saved '${listName} item' to DB.`);
            res.redirect(`/${listName}`);
        });
    }

});


app.post('/delete', function(req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === day){

        Item.findByIdAndRemove(checkedItemId, function(err){
            if (err){
                console.log(err);
            } else {
                console.log(`Successfully delete item with id(${checkedItemId}) from 'item list' to DB.`);
                res.redirect('/');
            }
        });

    } else {

        List.findOneAndUpdate(
            {name: listName},
            {$pull: {items : {_id: checkedItemId}}},
            function (err) {
                if (!err) {
                    console.log(`Successfully delete item with id(${checkedItemId}) from '${listName} list' to DB.`);
                    res.redirect(`/${listName}`);
                } else {
                    console.log(err);
                }
            }
        );
    }
});

//--------------------------------------------------------------//

// Server port
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});