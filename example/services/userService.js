const ph = require('password-hash');
const mongoose = require('mongoose');
const utils = require('../../lib/services/utils/common');

const createUser = (user, next) => {
    user.password = ph.generate(user.password);
    user.avtar = '/';
    user.gender = 'M';
    user.phoneNumber = '-';
    mongoose.model('User').create(user, (err, rs) => {
        if (err) {
            next(utils.fail(err));
        }
        else {
            next(utils.succ(rs));
        }
    });
};


module.exports = {
    createUser
}
