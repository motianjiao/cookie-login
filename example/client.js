const client = require('../index.js');
const db = require('./model/db');
const mongoose = require('mongoose');

const options = {
    findFunc: (table, options, fail, succ) => {
        mongoose.model(table).find(options, (err, rs) => {
            if (err) {
                return fail(err);
            }
            if (rs.length === 0) {
                return fail("no record found");
            }
            return succ(rs);
        })
    },
    updateFunc: (table, target, options, fail, succ) => {
        mongoose.model(table).update(options, { $set: options }, (err, rs) => {
            if (err) {
                return fail(err);
            }
            return succ(rs);
        })
    },
    deleteFunc: (table, options, fail, succ) => {
        mongoose.model(table).remove(options, (err, rs) => {
            if (err) {
                return fail(err);
            }
            return succ(rs);
        })
    },
    createFunc: (table, options, fail, succ) => {
        mongoose.model(table).create(options, (err, rs) => {
            if (err) {
                return fail(err);
            }
            return succ(rs);
        })
    }
};

const DB = new client.DB(options);
const userRouter = new client.UserRouter(DB, (req, res, rs) => {
    res.json(rs);
});

module.exports = userRouter;
