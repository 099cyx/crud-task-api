const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');
app.listen(3000, function() {
    console.log("server has started now");
});