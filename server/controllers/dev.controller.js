const Dev = require("../models/dev.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req,res) => {
    const {body} = req;
    
    //check for existing dev
    try{
        const queriedDev = await Dev.findOne({email: body.email})
        if (queriedDev) {
            res.status(400).json({error: "Email already in use."});
            return;
        }
    } catch (error) {
        res.status(400).json(err);
        return;
    }
    
    //save Dev to db
    const newDev= new Dev(body);
    try {
        const newDevObj = await newDev.save();
        const devToken = jwt.sign({id: newDevObj._id}, process.env.FIRST_SECRET_KEY);

        res.cookie("devtoken", devToken, process.env.FIRST_SECRET_KEY, {
            httpOnly: true,
            expires: new Date(Date.now() + 90000000)
        })
        .json({msg: "Successful Login"});  
        console.log("result", newDevObj);
    } catch (error) {
        console.log("Error in the mongoose save block");
        console.log(error)
        res.status(400).json(error);
        return;
    }
}

const login = async (req, res) => {
    const {body} = req;

    if (!body.email) {
        res.status(400).json({error: "No email provided"});
        return;
    }

    let devQuery;
    try {
        devQuery = await Dev.findOne({email: body.email});
    } catch (error){
        res.status(400).json({error: "Email not found"})
    }
    console.log('query: ', devQuery);

    if (devQuery === null){
        res.status(400).json({error: "Email not found"});
        return;
    }

    const passwordCheck = bcrypt.compareSync(body.password, devQuery.password);

    if (!passwordCheck) {
        res.status(400).json({error: "Email and Password do not match."})
        return;
    }

    const devToken = jwt.sign({id: devQuery._id}, process.env.FIRST_SECRET_KEY);

    res.cookie("devtoken", devToken, process.env.FIRST_SECRET_KEY, {
        httpOnly: true,
        expires: new Date(Date.now() + 90000000)
    })
    .json({msg: "Successful Login"});
};
const update = async (req,res) => {
    const updateDev = await Dev.put();
    res.json(updateDev);
}

const getDevByID = (req, res) => {
        Dev.findOne({_id:req.params.id})
            .then(dev => res.json(dev))
            .catch(err => res.json(err));
    }

const logout = (req,res) => {
    console.log("Logging Out");
    res.clearCookie("devtoken");
    res.json({
        message: "You have successfully logged out!"
    })
}

const getLoggedInDev = (req,res) => {
    const decodedJWT = jwt.decode(req.cookies.devtoken,{
        complete:true
    })
    console.log(decodedJWT.payload.id)
    Dev.findOne({_id: decodedJWT.payload.id})
        .then((dev)=>{
            console.log(dev);
            res.json(dev)
        })
        .catch((err)=>{
            console.log(err);
        })
}




module.exports = {
    register,
    login,
    update,
    getDevByID,
    logout,
    getLoggedInDev,
}

