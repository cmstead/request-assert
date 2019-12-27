const { assert } = require('chai');

function AsyncAssertion(asyncAction) {
    this.asyncAction = asyncAction;
    this.resultTransform = null;
}

AsyncAssertion.prototype = {
    assertResult: function(resultTransform) {
        // if(this.resultTransform !== null) {
        //     throw new Error('Function assertResult cannot be called more than once.');
        // }

        this.resultTransform = resultTransform;

        return this;
    },

    equals: function (expectedResult, message) {
        return new Promise((resolve, reject) => {
            this.asyncAction()
                .then(this.resultTransform)
                .then((value) => assert.equal(value, expectedResult, message))
                .then(() => resolve(true))
                .catch((error) => reject(error));
        });
    }
};

module.exports = AsyncAssertion;