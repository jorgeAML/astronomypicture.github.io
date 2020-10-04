const express = require('express');
const http = require('http');
const path = require('path');
//global object
let addDates = require('./dates');
/*express object*/
let app = express();
/*configure app*/
app.set('appName', 'Astronomy App');
/*define port*/
app.set('port', process.env.PORT || 8124);
/*absolute path for the folder template*/
app.set('views', path.join(__dirname, 'views'));
/*file extension for the template files*/
app.set('view engine', 'pug');
/*render*/
app.use(express.static(__dirname + '/public'));

app.all('*', (req, res) => {
    res.render('index', {msg:`Welcome home`});
});
/*http create server*/
http.createServer(app).listen(app.get('port'), () => {
    console.log(`The app is listening on ${app.get('port')}`);
});