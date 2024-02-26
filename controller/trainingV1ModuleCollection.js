const V1ModuleModel = require("../models/V1ModuleModel");
const autoLearningProcess = require("../utility/autoLeaningProcess");
const isForCalculation = require("../utility/isForCalculation");
const natural = require('natural');
 

const trainingV1Module = async (req, res) => {
    try{
        const {trainingObject} = req.body;
        
        for(let element of trainingObject){
            const trainingModuleObject = {
                request : element.request,
                response : element.response
            }
    
            const trainingModuleV1Object = new V1ModuleModel(trainingModuleObject);
            await trainingModuleV1Object.save();
        }
        

        return res.status(201).json({
            success : true,
            message : "+++++[DATA INSERTED INTO DB]+++++"
        })
    }catch(err){
        console.log('ERROR :::: ', err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong, Please try again later'
        })
    }
}

const trainingV1ModuleResponse = async(req, res) => {
    try{
        let { request } = req.body;
        if(isForCalculation(request)){
            const calculationResult = eval(request);
            return res.status(201).json({
                success : true,
                message : {
                    request,
                    response :  calculationResult
                }
            })
        }
        
        const getResponseForThisRequest = await V1ModuleModel.findOne({request : {$elemMatch : { $regex : request.trim(), $options : "i"}}});
        if(getResponseForThisRequest == null){
            const result = await autoLearningProcess(request);
            const updatedRequest = {
                request : [request],
                response : [result]
            }

            if(result == null){
                return res.status(401).json({
                    success : false,
                    message : {
                        request,
                        response : 'Still Under learning process'
                    }
                })
            }
            const updatedData = new V1ModuleModel(updatedRequest);
            await updatedData.save();
            return res.status(200).json({
                success : true,
                message : {
                    request,
                    response : result
                }
            })
        }

        return res.status(201).json({
            success : true,
            message : {
                request,
                response : getResponseForThisRequest.response[Math.floor(Math.random() * getResponseForThisRequest.response.length)]
            }
        })
    }catch(err){
        console.log('############', err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong, Please try again later'
        })
    }
}

const getAllDataOfAI = async(req, res) => {
    try{
        const allData = await V1ModuleModel.find().lean();

        const allUpdatedData = allData.map((element) => {
            return {
                request : element.request,
                response : element.response
            }
        })

        return res.status(200).json({
            success : true,
            message : allUpdatedData
        })
    }catch(err){
        console.log('############', err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong, Please try again later'
        })
    }
}
module.exports = {
    trainingV1Module,
    trainingV1ModuleResponse,
    getAllDataOfAI
}