var express = require('express')
    , stylus = require('stylus')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

if (env === 'development') {
    mongoose.connect('mongodb://localhost/cybea');
} else {
    mongoose.connect('mongodb://cybeagestion:EsPeLuzNanTe7@ds037581.mongolab.com:37581/cybea');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('Cybea db opened');
});

app.get('/partials/:partial', function (req, res) {
    res.render('partials/' + req.params.partial);
});

app.get('*', function (req, res) {
    res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('listening on port ' + port);