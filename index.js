const DB = require('./lib/services/db');
const UserRouter = require('./lib/routes/user.js');
const IsLoggedIn = require('./lib/middleware/IsLoggedIn.js');

module.exports = {
    DB,
    UserRouter,
}
