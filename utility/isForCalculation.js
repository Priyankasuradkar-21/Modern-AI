const isForCalculation = (string) => {
    try{
        const pattern = /^[\d\s+\-*/.()%]+$/;
        return pattern.test(string);
    }catch(err){

    }
}

module.exports = isForCalculation;
