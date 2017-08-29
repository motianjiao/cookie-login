const columns = {
    userId: 'uid',
    series: 'series',
    token: 'token',
    expire: 'expire',
    username: 'email',
    password: 'password'
}

const tables = {
    users: 'User',
    cookies: 'Cookie'
}

class DB {
    constructor(options) {
        this.create = options.createFunc;
        this.delete = options.deleteFunc;
        this.update = options.updateFunc;
        this.find = options.findFunc;
        this.columns = options.columns || columns;
        this.tables = options.tables || tables;
    }

    configTableNames(tables) {
        this.tables = tables;
    }

    configColumnNames(columns) {
        this.columns = columns;
    }

    configFind(findFunc) {
        this.find = findFunc;
    }

    configCreate(createFunc) {
        this.create = createFunc;
    }

    configDelete(deleteFunc) {
        this.delete = deleteFunc;
    }

    configUpdate(updateFunc) {
        this.update = updateFunc;
    }
}

//Each function takes 4 arguments


/*
 *table: the table to access
 *args: an object describes which record in the table
 *onError: a callback on error
 *onSucc: a callback on success
 */


/*
 * the update func takes 5 args
 * table
 * args
 * attributes: an object describes how to update the record
 * onError
 * onSucc
 */




module.exports = DB;
