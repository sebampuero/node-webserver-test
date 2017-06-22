const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine","hbs");
//middleware
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}
             IP Address : ${req.ip}`;
  fs.appendFile('server.log',log+'\n', (err)=>{
    if(err){
      console.log('Unable to append log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
//handlebars helper
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    title : 'Welcome to the page',
    welcomeTitle : 'Home'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    title : 'About'
  });
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
