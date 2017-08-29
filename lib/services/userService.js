const utils = require('./utils/common');

class UserService {
    constructor(DB) {
        this.db = DB;
        this.table = DB.tables.users;
    }

    getUserById(userId, next) {
        if (!userId) {
            this._onError({ message: 'Error getting user: missing user id'}, next);
        }
        const options = {};
        options[this.db.columns.userId] = userId;
        this.db.find(this.table, options, (err) => {
            this._onError(err, next);
        }, (result) => {
            this._onSucc(result, next);
        })
    }

    getUserByUsername(username, next) {
        if (!username) {
            this._onError({ message: "Error geeting user: missing username"}, next);
        }
        const options = {};
        options[this.db.columns.username] = username;
        this.db.find(this.table, options, (err) => {
            this._onError(err, next);
        }, (result) => {
            this._onSucc(result, next);
        })
    }


    _onError(err, next) {
        let result = utils.fail(err);
        next(result);
    }

    _onSucc(result, next) {
        let res = utils.succ(result);
        next(result);
    }
}

module.exports = UserService;
