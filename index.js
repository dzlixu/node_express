var express = require('express');
// 设置视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
var app = express();
var fortune = require('./lib/fortune.js');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// 设置端口
app.set('port', process.env.PORT || 3300);

// 设置静态目录
app.use(express.static(__dirname + '/public'));



app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function (req, res) {
    res.render('home');

});
app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function (req, res) {
    // res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
    res.render('/tours/request-group-rate');
});

app.get('/headers', function (req, res) {
    res.type('html');
    var s = '';
    for (var name in req.headers) {
        s += '<div>' + name + ':' + req.headers[name] + '\n' + '</div>';
    }
    res.send(s);
});


app.use(function (req, res) {
    res.render('404');
});

app.use(function (err, req, res) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + ':press ctrl +cc to terminate');
});



