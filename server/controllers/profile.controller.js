const Profile = require("../models/profile.model");
const jwt = require("jsonwebtoken");

module.exports.createProfile = (req, res) => {
    Profile.create(req.body)
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
}

module.exports.getAllProfiles = (req, res) => {
    Profile.find()
        .then(profiles => {
            console.log(profiles); 
            res.json(profiles);
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
}

module.exports.getProfile = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.devtoken,{
        complete:true
    })
    Profile.findOne({dev_id:decodedJWT.payload.id})
        .populate("tech")
        .populate("dev_id","-password")
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
}

module.exports.updateProfile = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.devtoken,{
        complete:true
    })
    Profile.findOneAndUpdate({dev_id: decodedJWT.payload.id}, req.body, {new:true})
        .then(updatedProfile => res.json(updatedProfile))
        .catch(err => res.json(err))
}

module.exports.deleteProfile = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.devtoken,{
        complete:true
    })
    Profile.deleteOne({ dev_id: decodedJWT.payload.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}

module.exports.createProfile = async (req, res) => {
    const newProfileObj = new Profile(req.body);
    const decodedJWT = jwt.decode(req.cookies.devtoken,{
        complete:true
    })

    try{
        const queriedProfile = await Profile.findOne({dev_id: decodedJWT.payload.id})
        if (queriedProfile) {
            res.status(400).json({error: "Profile already made."});
            return;
        }
        } catch (error) {
            res.status(500).json(err);
        }

    newProfileObj.dev_id = decodedJWT.payload.id;
    console.log(req.body)
    newProfileObj.save()
        .then(async(newProfileObj)=>{
            const newNewProfileObj= await newProfileObj.populate("tech")
            res.json(newNewProfileObj)
        })
        .catch((err)=>{
            console.log(err)
        })
}