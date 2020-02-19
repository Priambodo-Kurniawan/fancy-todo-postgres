const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var todos = require('./routes/todos');
app.use('/api/todos', todos);

var users = require('./routes/users');
app.use('/api/users', users);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});