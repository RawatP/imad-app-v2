var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



var names=[];
app.get('/submit-name/:name',function(req,res)
{
   //get the name from the request object
   var name=req.query.name;
   names.push(name);
    //json is way of converting java object into strings
   res.send(JSON.stringify(names)); 
});


app.get('/:articleName',function(req,res)
{
    var articleName=req.param.articleName;
  res.send(createTemplate(articles[articleName]))   ;
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
