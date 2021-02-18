const check = require('check-types');
module.exports = {
    variable: function(type, variable) {
        if (check[type](variable))
            return true;
        throw Error("An unexpected type!");
    }
};