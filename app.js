var express = require('express');
var path = require('path');
var ejs=require('ejs');
/*var bodyParser = require('body-parser');*/
//var cookieParser = require('cookie-parser');
/*var session = require('express-session');
var webRouter = require('./web_router');
var config = require('./config');
require('./models');*/

var app = express();

app.set('views', path.join(__dirname, 'views'));
//app.set('view cache', true);
app.set('view engine', 'html');
app.engine('html',ejs.renderFile);

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: config.app.sessionSecret,
	resave: true,
	saveUninitialized: true,
}));
app.use(require('./middlewares/request_logger')());*/
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', function (req, res, next) {
	if (req.session && req.session.user) {
		res.locals.user = req.session.user
	}
	next();
})*/

/*app.use(require('./middlewares/error_page')());

app.use('/', webRouter);

app.use(function (error, req, res, next) {
	res.renderError(error);
});
*/

app.get("/",function(req,res){
	res.render("index",{});
});

/*app.listen(config.app.port, function () {
	console.log(config.app.name + ' is listening on port ' + config.app.port);
});*/
app.listen(80, function () {
	console.log('app is listening on port 80');
});