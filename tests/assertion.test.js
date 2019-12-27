const AsyncAssertion = require('../dependencies/AsyncAssertion');
const promisePuppeteer = require('promise-puppeteer');
const { assert } = require('chai');

function delayedResolve(thenableFake, result) {
    setTimeout(() => thenableFake.resolve(result), 15);
}

describe("Assertion", function () {

    let assertion;
    let thenableFake;

    before(function () {
        thenableFake = promisePuppeteer.getThenableFake();
        const asyncAction = () => thenableFake;

        assertion = new AsyncAssertion(asyncAction);
    });

    it("uses a transform to capture result for assertion", function () {
        const actualResult = { message: 'YAY' };

        delayedResolve(thenableFake, actualResult);

        return assertion
            .assertResult(result => result.message)
            .equals('YAY');
    });

    it("fails when transform result doesn't match expected result", function () {
        const actualResult = { message: 'bad message' };

        delayedResolve(thenableFake, actualResult);

        let resolutionState = true;

        return assertion

            .assertResult(result => result.message)
            .equals('ANOTHER YAY')

            .then(() => {
                resolutionState = false;

                assert.isTrue(resolutionState, 'Assertion did not fail on bad equality');
            })
            .catch(() => {
                assert.isTrue(resolutionState);
            });
    });

});