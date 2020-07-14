const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const _          = require('lodash');

const Item = require('../models/Item');
const List = require('../models/List');

const defaultItems = require('../defautItems');

const date       = require('../date');
const day        = _.capitalize(date.getDay());


router.get('/', (req, res) => {

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


router.get('/:customListName', function(req,res) {

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


router.post('/', (req, res) => {

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


router.post('/delete', function(req, res) {
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

module.exports = router;