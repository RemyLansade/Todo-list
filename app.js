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
    
    const currentDayId = new Date().getDay();
    let currentDay = "";

    // if (currentDayId === 6 || currentDayId === 0 ) {
    //     currentDay = "It's week-end";
    // } else {
    //     currentDay = "It's workday";
    // }

    switch (currentDayId) {

        case 0:
            currentDay = "sunday";
            break;
        
        case 1:
            currentDay = "monday";
            break;

        case 2:
            currentDay = "tuesday";
            break;

        case 3:
            currentDay = "wednesday";
            break;

        case 4:
            currentDay = "thursday";
            break;

        case 5:
            currentDay = "friday";
            break;

        case 6:
            currentDay = "saturday";
            break;
        
        default:
            console.log(`ERROR: Current day ID is egal to ${currentDayId}`);
            break;
    }

    res.render('./pages/index', {currentDay: currentDay});
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});