const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

const roots     = require('./routes/router');

const app = express();


// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Router
app.use('/', roots);


// Init mongoose
mongoose.connect('mongodb+srv://admin-remy:admin@cluster0.8w725.mongodb.net/todolistDB', { 
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});