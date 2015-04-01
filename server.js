var express = require('express')
    , stylus = require('stylus')
    , logger = require('morgan');

var env = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

app.get('/partials/:partial', function (req, res) {
    res.render('partials/' + req.params.partial);
});

app.get('*', function (req, res) {
    res.render('index');
});

var port = 3030;
app.listen(port);
console.log('listening on port ' + port);