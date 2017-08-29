const schemas = {
    userSchema: {
        name: 'User',
        columns: {
            userId: '_id',
            username: 'email',
            password: 'password'
        }
    },
    cookieSchema: {
        name: 'Cookie',
        columns: {
            series: 'series',
            token: 'token',
            expire: 'expire',
            userId: 'uid'
        }
    }
}

class DB {
    constructor(options) {
        this.create = options.createFunc;
        this.delete = options.deleteFunc;
        this.update = options.updateFunc;
        this.find = options.findFunc;
        this.schemas = options.schemas || schemas;
    }

    configSchema(schema) {
        this.schema = schema;
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
