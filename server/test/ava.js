"use strict";
exports.__esModule = true;
var ava_1 = require("ava");
var fn = function () { return 'Ava unit test works'; };
ava_1["default"]('Ava unit test is working', function (t) {
    t.is(fn(), 'Ava unit test works');
});
