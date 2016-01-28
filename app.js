/*
 * Module dependencies
*/
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');

// Set up Express
var app = express();

// Compile Stylus to CSS
function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .use(nib());
}

// Set up Jade with views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Middleware
app.use(express.logger('dev'));
app.use(stylus.middleware(
    { src: __dirname + '/public',
      compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', function(req, res) {
    res.render('index', { title: 'Home'});
});

app.listen(3000);