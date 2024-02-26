const express = require('express');
const { trainingV1Module, getAllDataOfAI } = require('../controller/trainingV1ModuleCollection');
const router = express.Router();

router.post('/module/v1/request', trainingV1Module); 
router.get('/module/v1/all', getAllDataOfAI);
module.exports = router;