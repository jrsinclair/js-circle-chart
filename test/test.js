/**
 * QUnit Tests for Circle Chart
 */
/*global CircleChart, require, test, equal, ok, $ */

(function circleChartTests() {
    "use strict";

    var el = $('.circle-chart')[0],
        cc;

    test("Test that creating an object works", function () {
        if (cc === undefined) { cc = new CircleChart(el); }
        equal('object', typeof cc, "cc should be an object");
    });

    test("Test that init() can create paper.", function () {
        if (cc === undefined) { cc = new CircleChart(el); }
        equal('object', typeof cc.paper, "cc should have paper");
    });

    test("Test that init() creates HTML structure.", function () {
        if (cc === undefined) { cc = new CircleChart(el); }
        equal($('.circle-chart__text').length, 1);
    });

    test("Test that calc rads calculates rads", function () {
        if (cc === undefined) { cc = new CircleChart(el); }
        var tests = [
            {expected: 0, inpt: 0},
            {expected: Math.PI / 2, inpt: 0.25},
            {expected: Math.PI, inpt: 0.5}
        ];
        tests.forEach(function (set) {
            equal(cc.calcRads(set.inpt), set.expected, "Calc rads should be correct");
        });
    });

    test("Test that calcXY() calculates X and Y", function () {
        if (cc === undefined) { cc = new CircleChart(el); }
        var tests = [
            {expected: [50, 10], inpt: 0},
            {expected: [90, 50], inpt: 25 / 100},
            {expected: [50, 90], inpt: 50 / 100},
            {expected: [10, 50], inpt: 75 / 100}
        ];
        tests.forEach(function (set) {
            var actual = cc.calcXY(set.inpt);
            deepEqual(
                actual.map(function (x) { return parseInt(x, 10); }),
                set.expected,
                "CalcXY should be correct. Expected " + JSON.stringify(set.expected)
                    + " but got " + JSON.stringify(actual)
            );
        });
    });

    test("Test that getPathTxt returns path", function () {
        if (cc === undefined) { cc = new CircleChart(el); }
        var pth = cc.getPathTxt(0.25);
        equal(pth, "M50 10A40 40 0 0 1 90 50");
    });
}(jQuery));