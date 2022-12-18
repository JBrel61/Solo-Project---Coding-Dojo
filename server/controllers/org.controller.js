const Org = require("../models/org.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// module.exports.index = (request, response) => {
//     response.json({
//         message: "Hello World"
//     });
// }

// module.exports.createProduct = (request, response) => {
//     Product.create(request.body)
//         .then(product => response.json(product))
//         .catch(err => response.json(err));
// }

// module.exports.getAllProducts = (request, response) => {
//     Product.find({})
//         .then(products => {
//             console.log(products); 
//             response.json(products);
//         })
//         .catch(err => {
//             console.log(err)
//             response.json(err)
//         })
// }

// module.exports.getProduct = (request, response) => {
//     Product.findOne({_id:request.params.id})
//         .then(product => response.json(product))
//         .catch(err => response.json(err));
// }

// module.exports.updateProduct = (request, response) => {
//     Product.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
//         .then(updatedProduct => response.json(updatedProduct))
//         .catch(err => response.json(err))
// }

// module.exports.deleteProduct = (request, response) => {
//     Product.deleteOne({ _id: request.params.id })
//         .then(deleteConfirmation => response.json(deleteConfirmation))
//         .catch(err => response.json(err))
// }
//update things above

const register = async (req,res) => {
    const {body} = req;
    
    //check for existing org
    try{
        const queriedOrg = await Org.findOne({email: body.email})
        if (queriedOrg) {
            res.status(400).json({error: "Email already in use."});
            return;
        }
    } catch (error) {
        res.status(400).json(err);
    }
    
    //save org to db
    const newOrg= new Org(body);
    try {
        const newOrgObj = await newOrg.save();
        res.json(newOrgObj)
        console.log("result", newOrgObj);
    } catch (error) {
        console.log("Error in the mongoose save block");
        console.log(error)
        res.status(400).json(error);
        return;
    }

    // const result = await Org.create(body);
    // console.log("result", result);
    // res.json({msg: "you got here"});
};

const login = async (req, res) => {
    const {body} = req;

    if (!body.email) {
        res.status(400).json({error: "No email provided"});
        return;
    }

    let orgQuery;
    try {
        orgQuery = await Org.findOne({email: body.email});
    } catch (error){
        res.status(400).json({error: "Email not found"})
    }
    console.log('query: ', orgQuery);

    if (orgQuery === null){
        res.status(400).json({error: "Email not found"});
        return;
    }

    const passwordCheck = bcrypt.compareSync(body.password, orgQuery.password);

    if (!passwordCheck) {
        res.status(400).json({error: "Email and Password do not match."})
        return;
    }

    const orgToken = jwt.sign({id: orgQuery._id}, process.env.SECOND_SECRET_KEY);

    res.cookie("orgtoken", orgToken, process.env.SECOND_SECRET_KEY, {
        httpOnly: true,
        expires: new Date(Date.now() + 90000000)
    })
    .json({msg: "Successful Login"});
};

module.exports = {
    register,
    login,
}