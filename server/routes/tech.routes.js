const TechController = require('../controllers/tech.controller');
module.exports = (app) => {
    app.post('/tech/create', TechController.create);
};