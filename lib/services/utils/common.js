

const succ = (result) => {
    return {
        succ: true,
        result: result
    }
};

const fail = (result) => {
    return {
        succ: false,
        result: result
    }
};

const respond = (res, obj) => {
    res.format({
        json: () => {
            res.json(obj);
        }
    })
};

module.exports = {
    succ,
    fail,
    respond
}
