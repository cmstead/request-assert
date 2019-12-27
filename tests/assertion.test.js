const AsyncAssertion = require('../dependencies/AsyncAssertion');
const promisePuppeteer = require('promise-puppeteer');

describe("Assertion", function () {

    let asyncAssertion;
    let thenableFake;

    before(function () {
        thenableFake = promisePuppeteer.getThenableFake();
        const asyncAction = () => thenableFake;

        assertion = new AsyncAssertion(asyncAction);
    });

    it("uses a transform to capture result for assertion", function () {
        const actualResult = { message: 'YAY' };

        assertion
            .assertResult(result => result.message)
            .equals('YAY');

        thenableFake.resolve(actualResult);
    });

});