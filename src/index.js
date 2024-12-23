const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const app = express()
const port = 3000
const methodOverride = require('method-override')

const db = require('./config/db')
const route = require('./routes')

//connect DB
db.connect()

//
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())


//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'))

// Routes init
route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
