var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg'),Pool;
var config=
{
    user:'rawatp',
    database:'rawatp'
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles={ 

'article-one':{
    titl:'Article one|Neo',
    heading:'Article one',
    date:'sep 5, 2016',
    content:`
    <p>
                This is the content for first article.This is the content for first article..This is the content for first article.This is the content for first article.
            </p>
            <p>
                This is the content for first article.This is the content for first article..This is the content for first article.This is the content for first article.
    </p>`
      
},
'article-two':{
    titl:'Article Two|Neo',
    heading:'Article Two',
    date:'sep 5, 2016',
    content:`
    <p>
                This is the content for Second article.This is the content for Second article..This is the content for Second article.This is the content for Second article.
            </p>
            <p>
                This is the content for Second article.This is the content for Second article..This is the content for Second article.This is the content for Second article.
    </p>`
      
},
'article-three':{
    titl:'Article Three|Neo',
    heading:'Article Three',
    date:'sep 5, 2016',
    content:`
    <p>
                This is the content for Third article.This is the content for Third article..This is the content for Third article.This is the content for Third article.
            </p>
            <p>
                This is the content for Third article.This is the content for Third article..This is the content for Third article.This is the content for Third article.
    </p>`
      
}
};
function createTemplate(data){
    //var titl=data.titl;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate=`

<html>
    <head>
        <title>
            ${titl}
        </title>    
        <meta name="viewport" content="width=device-width, initial-scale-1" />
                <link href="/ui/style.css" rel="stylesheet" />

    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>   
        <hr/>//horizontal line
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
    </div>
    </body>    
</html>
`;

return htmlTemplate;
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result)
    {
       if(err)
       {
           res.status(500).send(err.toString());
       }
    });
    
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



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/:articleName',function(req,res)
{
    var articleName=req.param.articleName;
  res.send(createTemplate(articles[articleName]))   ;
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
