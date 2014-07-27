/* global module */
module.exports = function (n, options) {
    "use strict";

    var ret = "";

    for(var i=0; i<n; i++) {
        ret = ret + options.fn(this);
    }

    return ret;
};
