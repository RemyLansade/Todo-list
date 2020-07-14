const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const roots      = require('./routes/router');
const config     = require('./config');

// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Router
app.use('/', roots);


// Init mongoose
mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@cluster0.8w725.mongodb.net/${config.db.name}`, { 
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true 
});


let port = config.app.port;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});