const Item = require('../models/Item');

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

module.exports = defaultItems;