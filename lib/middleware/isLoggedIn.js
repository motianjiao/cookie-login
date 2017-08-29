const utils = require('../services/utils/common');
const uuid = require('node-uuid');

class IsLoggedIn {
    constructor(UserRouter) {
        this.db = UserRouter.db;
        this.cookieClient = UserRouter.cookieClient;
        this.fail = UserRouter.fail;
        this.cookieSchema = this.db.schemas.cookieSchema;
        this.userSchema = this.db.schemas.userSchema;
    }

    isLoggedIn(req, res, next) {
        const cookies = req.cookies;
        if (!cookies.series || !cookies.token) {
            return this.fail(req, res, utils.fail("User is not logged in"));
        }
        const options = {};
        options[this.cookieSchema.columns.series] = cookies.series;

        this.cookieClient.findCookie(cookies.series, (rs) => {
            if (!rs.succ) {
                rs.message = "cookie not found";
                return this.fail(req, res, rs);
            }
            let result = rs.result;
            if (Array.isArray(result) && result.length === 1) {
                result = result[0];
            }
            //TODO token should be hashed
            let token = result[this.cookieSchema.columns.token];
            if (token !== cookies.token) {
                return this.fail(req, res, utils.fail("token mismatch!"));
            };
            let expire = result[this.cookieSchema.columns.expire];
            if (expire < Date.now()) {
                return this.fail(req, res, utils.fail("session expired"));
            }
            const userId = result[this.userSchema.columns.userId];
            const options = {};
            options[this.cookieSchema.columns.expire] = this.cookieClient.expire + Date.now();
            options[this.cookieSchema.columns.token] = uuid.v4();
            this.cookieClient.updateCookie(userId, options, (rs) => {
                if (!rs.succ) {
                    return this.fail(req, res, rs);
                }
                req[this.cookieSchema.columns.userId] = userId;
                console.log(`User with ${this.userSchema.columns.userId} ${userId} just performed an action that requires login`);
                next();
            })
        })
    }
}

module.exports = IsLoggedIn;
