const OrgController = require('../controllers/org.controller');
module.exports = (app) => {
    app.post('/orgs/register', OrgController.register)
    app.post('/orgs/login', OrgController.login)
    app.get('/orgs/dashboard');

}

