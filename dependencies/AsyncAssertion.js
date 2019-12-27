const { assert } = require('chai');

function Assertion() {}

Assertion.prototype = {
    equals: function () {}
};

function AsyncAssertion() {}

AsyncAssertion.prototype = {
    assertResult: function() {
        return new Assertion();
    }
};

module.exports = AsyncAssertion;