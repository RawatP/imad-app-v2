var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var artical={   
 `artical-one`: {
    title:' Artical one | RawatP',
    heading:'Artical One',
    date:'feb 20 2017',
    content: `<p>
                         This is the content of my first artical.This is the content of my first artical.This is the content of my first artical.This is the content of my first artical.This is the content of my first artical.
                        </p> `

  },
`artical-two`: { 
    

    title:' Artical Two | RawatP',
    heading:'Artical Two',
    date:'feb 20 2017',
    content: `
    
    <p>
                         This is the content of my Second artical.This is the content of my Second artical.This is the content of my Second artical.This is the content of my Second artical.This is the content of my Second artical.
                        </p>`
                        },

`artical-three`:{
    title:' Artical Three | RawatP',
    heading:'Artical Three',
    date:'feb 20 2017',
    content: `<p>
                         This is the content of my Third artical.This is the content of my Third artical.This is the content of my Third artical.This is the content of my Third artical.This is the content of my Third artical.
                        </p> `
    
},

};


function createTemplate(data){
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;

var htmlTemplate=`

<html>
    <head>
        <title>
            ${title }
            </title>
            <meta name="viewport" content="width=device-width, inital-scale=1">
             <link href="/ui/style.css" rel="stylesheet" />
                </head>
        <body>
            <div class="container">
                    <div>
                        <a  href="/">Home</a>
                    </div>
                    <hr/>
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
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get(`/:articalName`,function(req,res){
    var articalName=req.param.articalName;
  res.send(createTemplate(articals[articalName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
