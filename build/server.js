
var express=require('express');
var app=express();

app.use(express.static('public'));
app.get('/index.html',function (req,res){
	res.sendFile(__dirname + '/index.html' );
});
app.get('/static/css/main.f9880e29.css',function (req,res){
	res.sendFile(__dirname + '/static/css/main.f9880e29.css');
});
app.get('/static/css/main.f9880e29.css.map',function (req,res){
	res.sendFile(__dirname + '/static/css/main.f9880e29.css.map');
});
app.get('/static/js/main.f5a3c88a.js',function (req,res){
	res.sendFile(__dirname + '/static/js/main.f5a3c88a.js');
});
app.get('/static/js/main.f5a3c88a.js.map',function (req,res){
	res.sendFile(__dirname + '/static/js/main.f5a3c88a.js.map');
});



var server=app.listen(8081, function() {
	var host=server.address().address
	var port=server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
});

