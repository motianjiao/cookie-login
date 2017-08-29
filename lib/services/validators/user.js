const utils = require('../utils/common');


class UserValidator {
    constructor(columns) {
        this.columns = columns;
    }

    validateLogin(body) {
        if (!body[this.columns.username]) {
            return utils.fail(`missing required field: ${this.columns.username}`);
        }
        if (!body[this.columns.password]) {
            return utils.fail(`missing required field: ${this.columns.password}`);
        }
        return utils.succ();
    }
}

module.exports = UserValidator;
