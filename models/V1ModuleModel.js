const mongoose = require('mongoose');
const V1ModuleModelTable = new mongoose.Schema({
    request : {
        type : []
    },
    response : {
        type : []
    }
})

const V1ModuleModel = mongoose.model('V1ModuleModel', V1ModuleModelTable);
module.exports = V1ModuleModel;