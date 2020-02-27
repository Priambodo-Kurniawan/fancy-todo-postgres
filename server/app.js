const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const router = require('./routes/index');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});