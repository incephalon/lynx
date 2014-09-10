var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();


var mongojs = require("mongojs");
var mongourl = 'mongodb://incephalon:lthnia90_@ds050087.mongolab.com:50087/themap';
var collectionList = ["bookmark"];
var db = mongojs.connect(mongourl, collectionList);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/save', function(req, res, next){
    var options = req.query;
    options.date = new Date();
    console.log(options);
    res.send(200, 'Cool')

return;
    db.bookmark.insert(options,function(err,data){
        if(data){
            res.send(data);
        }
        else{
        }
    });
});

app.use('/fetch', function(req, res, next){
    db.bookmark.find({},function(err,data){
        console.log(err);
        if(data){
            res.send(data);
        }
        else{
            res.send("{}");
        }
         
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(process.env.PORT || 3000 ,function(){
    console.log("app started at port 3000");
});
module.exports = app;

var url = "http://skruflix.me:4000//stream?id=tt0944947&show=1&season=1&episode=2&file=magnet%3A%3Fxt%3Durn%3Abtih%3ASJ4DX6NRO5CDE3CLDL2OLWCTEYRUFWQU%26dn%3DGame.of.Thrones.S01E01.HDTV.XviD-FEVER%26tr%3Dudp%3A%2F%2Ftracker.openbittorrent.com%3A80%26tr%3Dudp%3A%2F%2Ftracker.publicbt.com%3A80%26tr%3Dudp%3A%2F%2Ftracker.istole.it%3A80%26tr%3Dudp%3A%2F%2Fopen.demonii.com%3A80%26tr%3Dudp%3A%2F%2Ftracker.coppersurfer.tk%3A80";
console.log(url.match("episode"))