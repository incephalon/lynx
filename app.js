var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var rovicorp = require('./server/rovicorp');
var app = express();


var mongojs = require("mongojs");
var mongourl = 'mongodb://incephalon:lthnia90_@ds050077.mongolab.com:50077/links';
var collectionList = ["bookmark"];
var db = mongojs.connect(mongourl, collectionList);
        
// db.bookmark.find({},function(err,data){
//     console.log("testing db")
//     console.log(err)
//     console.log(data)
// });
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

    var tags = options.tags;
    tags = tags.replace(/ /g,'').split(",");
    options.tags = tags;  
    console.log(tags);
    console.log(options);
    // for(i=0;i<tags.length;i++){
        // options.tags = tags[i]; 
        if(options._id)
        {   
            console.log("update");
            console.log(options._id+"/-")
            var id = options._id;
            delete options._id;
            db.bookmark.update({"_id":id},{$set : options},function(err,data){
                
                console.log(err+"err")
                console.log(data)
            })
            // console.log(options)
        }
        else
        {
            delete options._id;
            console.log("save")
            db.bookmark.insert(options,function(err,data){
                
                console.log(err);
                if(data){
                    res.send(data);
                }
                
            });
        }
    // }
    
});

app.use('/fetch', function(req, res, next){
    var options = req.query;
    console.log(options)
    options.tags = [options.tags];
    db.bookmark.find({ tags: { $all: options.tags } },function(err,data){           

        console.log("fetch")
        console.log(err);
        console.log(data);
        if(data){
            console.log(data);
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
