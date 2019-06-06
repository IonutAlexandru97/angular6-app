require('./config/config');
require('./config/db');
require('./config/passport');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
const routes = require('./routes');
const passport = require('passport');
const logger = require('morgan');

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(logger('dev'));

app.use('/api', routes);

//error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));