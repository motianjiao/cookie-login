const express = require('express');
const userValidator = require('../services/validators/user');
const userService = require('../services/userService');
const cookieService = require('../services/cookieService');
const passwordHash = require('password-hash')
const utils = require('../services/utils/common');

class UserRouter {
    constructor(DB) {
        this.db = DB;
        this.columns = DB.columns;
        this.validator = new userValidator(this.columns);
        this.userClient = new userService(this.db);
        this.cookieClient = new cookieService(this.db);
    }

    login(req, res) {
        let user = req.body;
        let result = this.validator.validateLogin(user);
        if (!result.succ) {
            return utils.respond(res, result);
        }
        const username = user[this.columns.username];
        const password = user[this.columns.password];

        this.userClient.getUserByUsername(username, (rs) => {
            if (rs.succ) {
                const user = rs.result;
                if (!passwordHash.verify(password, user[this.columns.password])) {
                    return utils.respond(res, utils.fail("incorrect password"));
                }
                this.cookieClient.createCookie(user[this.columns.userId], (rs) => {
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
        const series = req.body.series;
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
