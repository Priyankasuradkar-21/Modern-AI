const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
require("./database/mongoDB");
const PORT = process.env.PORT;

const trainingV1ModuleRequest = require("./routes/trainModuleRequest");
const trainingV1ModuleResponse = require("./routes/trainingModuleResponse");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
;
app.use(bodyParser.json())
app.use(trainingV1ModuleRequest);
app.use(trainingV1ModuleResponse);
app.get('/', (req, res) => {
    return res.status(201).json({
        success : true,
        message : 'Server is up and running'
    })
})
app.listen(PORT, () => {
        console.log(`Server is Listening on PORT :::: ${PORT}`);
})