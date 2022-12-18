const ProfileController = require('../controllers/profile.controller');
const TechController = require('../controllers/tech.controller');
module.exports = (app) => {
    app.get('/devs/techs', TechController.findAll);
    app.post('/devs/profile', ProfileController.createProfile);
    app.get('/devs/profile', ProfileController.getProfile);
    app.put('/devs/profile', ProfileController.updateProfile);
    app.delete('/devs/profile', ProfileController.deleteProfile);
}