const utils = require('./utils/common.js');
const uuid = require('node-uuid');

class CookieService {
    constructor(DB, expire) {
        this.db = DB;
        this.schema = DB.schemas.cookieSchema;
        this.userSchema = DB.schemas.userSchema;
        this.expire = expire || (1000 * 3600 * 24 * 7);
        this.table = this.schema.name;
    }

    _onError(err, next) {
        let result = utils.fail(err);
        next(result);
    }

    _onSucc(result, next) {
        let res = utils.succ(result);
        next(res);
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
        options[this.schema.columns.userId] = userId;
        this.db.delete(this.table, options, (err) => {
            this._onError(err, next);
        }, (rs) => {
            const cookie = this._generateCookie();
            const options = {};
            options[this.schema.columns.series] = cookie.series;
            options[this.schema.columns.token] = cookie.token;
            options[this.schema.columns.userId] = userId;
            options[this.schema.columns.expire] = this.expire + Date.now();
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
        options[this.schema.columns.series] = series;
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
        options[this.schema.columns.userId] = userId;
        this.db.update(this.table, options, attributes, (err) => {
            this._onError(err, next);
        }, (result) => {
            this._onSucc(result, next);
        })
    }

    findCookie(series, next) {
        if (!series) {
            this._onError({ message: "Error finding cookie: Missing series"}, next);
        }
        const options = {};
        options[this.schema.columns.series] = series;
        this.db.find(this.table, options, (err) => {
            this._onError(err, next);
        }, (result) => {
            this._onSucc(result, next)
        })
    }
}


module.exports = CookieService;
