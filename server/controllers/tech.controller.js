const Tech = require("../models/tech.model");

const create = async (req,res) => {
    const {body} = req;
    
    //check for existing tech
    try{
        const queriedTech = await Tech.findOne({name: body.name})
        if (queriedTech) {
            res.status(400).json({error: "Tech already used."});
            return;
        }
    } catch (error) {
        res.status(400).json(err);
    }
    
    //save Tech to db
    const newTech= new Tech(body);
    try {
        const newTechObj = await newTech.save();
        res.json(newTechObj)
        console.log("result", newTechObj);
    } catch (error) {
        console.log("Error in the mongoose save block");
        console.log(error)
        res.status(400).json(error);
        return;
    }
}

const findAll = async (req,res) => {
    try {
        const queryTech = await Tech.find();
        res.json(queryTech);
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    create,
    findAll,
}