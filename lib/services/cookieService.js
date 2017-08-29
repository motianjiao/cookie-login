const utils = require('./utils/common.js');
const uuid = require('node-uuid');

class CookieService {
    constructor(DB, expire) {
        this.db = DB;
        this.table = DB.tables.cookies;
        this.expire = expire || (1000 * 3600 * 24 * 7);
    }

    _onError(err, next) {
        let result = utils.fail(err);
        next(result);
    }

    _onSucc(result, next) {
        let res = utils.succ(result);
        next(result);
    }

    _generateCookie() {
        return {
            series: uuid.v1(),
            token: uuid.v4()
        }
    }

    createCookie(userId, next) {
        if (!userId) {
            this._onError({message: "Error creating cookie: Missing user id"}, next);
        }
        const options = {};
        options[this.db.columns.userId] = userId;
        this.db.delete(this.table, options, (err) => {
            this._onError(err, next);
        }, (rs) => {
            const cookie = this._generateCookie();
            const options = {};
            options[this.db.columns.series] = cookie.series;
            options[this.db.columns.token] = cookie.token;
            options[this.db.columns.userId] = userId;
            options[this.db.columns.expire] = this.expire + Date.now();
            this.db.create(this.table, options, (err) => {
                this._onError(err, next);
            }, (result) => {
                this._onSucc(result, next);
            })
        })
    }

    deleteCookie(series, next) {
        if (!series) {
            this._onError({message: "missing series"}, next);
        }
        const options = {};
        options[this.db.columns.series] = series;
        this.db.delete(this.table, options, (err) => {
            this._onError(err, next);
        }, (result) => {
            this._onSucc(result, next);
        })
    }

    updateCookie(userId, attributes, next) {
        if (!userId) {
            this._onError({message: "Error updating cookie: Missing user id"}, next);
        }
        const options = {};
        options[this.db.columns.userId] = userId;
        this.db.update(this.table, options, attributes, (err) => {
            this._onError(err, next);
        }, (result) => {
            this._onSucc(result, next);
        })
    }
}


module.exports = CookieService;
