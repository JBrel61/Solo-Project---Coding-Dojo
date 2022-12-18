const DevController = require('../controllers/dev.controller');
const TechController = require('../controllers/tech.controller');
module.exports = (app) => {
    app.post("/devs/register", DevController.register);
    app.post("/devs/login", DevController.login);
    app.post("/devs/logout", DevController.logout)
    app.get("/devs/getdev", DevController.getLoggedInDev) 
    app.get("/devs/skills/languages", TechController.findAll);
    app.put("/devs/skills/languages", DevController.update);
};