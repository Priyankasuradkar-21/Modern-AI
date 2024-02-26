const express = require('express');
const {trainingV1ModuleResponse } = require('../controller/trainingV1ModuleCollection');
const router = express.Router();

router.post('/module/v1/response', trainingV1ModuleResponse); 
module.exports = router;