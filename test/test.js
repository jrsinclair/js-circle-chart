/**
 * QUnit Tests for Circle Chart
 */
/*jslint browser:true*/
/*global CircleChart, require, test, equal, ok */

(function circleChartTests() {
    "use strict";

    function $(cssStr) {
        return document.querySelector(cssStr);
    }

    var el = $('.circle-chart'),
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
        equal($('.circle-chart__text').innerHTML, '66.7%');
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

}());