/* global module */
module.exports = function (value, test, options) {
    "use strict";

    if (value === test) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
