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
    
    const todayId  = new Date();
    const options = {
        weekday : "long",
    };
    
    const currentDay = todayId.toLocaleDateString("en-US", options);

    res.render('./pages/index', {currentDay: currentDay});
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});