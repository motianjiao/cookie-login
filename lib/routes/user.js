const express = require('express');
const userValidator = require('../services/validators/user');
const userService = require('../services/userService');
const cookieService = require('../services/cookieService');
const passwordHash = require('password-hash')
const utils = require('../services/utils/common');
const IsLoggedIn = require('../middleware/isLoggedIn');

class UserRouter {
    constructor(DB, fail) {
        this.db = DB;
        this.userSchema = DB.schemas.userSchema;
        this.cookieSchema = DB.schemas.cookieSchema;

        this.userClient = new userService(this.db);
        this.validator = new userValidator(this.userSchema.columns);
        this.cookieClient = new cookieService(this.db);
        this.fail = fail;
        this.middleware = new IsLoggedIn(this);
    }

    login(req, res) {
        let user = req.body;
        let result = this.validator.validateLogin(user);
        if (!result.succ) {
            return utils.respond(res, result);
        }
        const username = user[this.userSchema.columns.username];
        const password = user[this.userSchema.columns.password];

        console.log("logging in")
        this.userClient.getUserByUsername(username, (rs) => {
            if (rs.succ) {
                const user = rs.result;
                if (!passwordHash.verify(password, user[this.userSchema.columns.password])) {
                    return utils.respond(res, utils.fail("incorrect password"));
                }
                this.cookieClient.createCookie(user[this.userSchema.columns.userId], (rs) => {
                    if (rs.succ) {
                        res.cookie('series', rs.result.series);
                        res.cookie('token', rs.result.token);
                        rs.user = user;
                    }
                    utils.respond(res, rs);
                })
            } else {
                utils.respond(res, rs);
            }
        });
    }

    logout(req, res) {
        const series = req.cookies.series;
        console.log("series", series);
        if (!series) {
            return utils.respond(res, utils.fail("missing series"));
        }
        this.cookieClient.deleteCookie(series, (rs) => {
            //TODO what if the series is not in the db?
            res.clearCookie('series');
            res.clearCookie('token');
            utils.respond(res, rs);
        })
    }
}


module.exports = UserRouter;
