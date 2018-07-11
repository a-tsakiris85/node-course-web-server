const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

app = express(); //initialize the app

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  now = new Date().toString();
  info = `${now}: ${req.method} ${req.url}`;
  console.log(info);
  fs.appendFileSync("server.log", info + '\n');
  next();
});

// app.use((req, res, next) => { //will bypass everything because does not call next()
//   res.render('maintenance.hbs', {
//     pageTitle: "MAINTENANCE"
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express </h1>'); //send some html
  // res.send({
  //   name: 'Andrew',
  //   likes: ['pizza', 'chikin nugets'] //send some json
  // });

  res.render('home.hbs', {
    pageTitle: "Home Page",
    //currentYear: new Date().getFullYear(),
    welcomeMessage: "Welcome to my site!"
  })
});

app.get('/about', (req, res) => {  //use a different url
  //res.send('<p> Hi </p>');
  res.render('about.hbs', {
    pageTitle: "About Page",
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => { //send JSON with error message
  res.send( {
    errorMessage: 'You suck'
  });
});

app
app.listen(3000); //put it on a port
