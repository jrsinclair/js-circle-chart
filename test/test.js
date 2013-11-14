/**
 * QUnit Tests for Circle Chart
 */
/*jslint browser:true*/
/*global CircleChart, require, test, equal, ok */

(function circleChartTests() {
    "use strict";

    function $(cssStr) {
        var el = document.querySelector(cssStr);
        return el;
    }

    /**
     * Polyfill for forEach.
     */
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            var i, len;
            for (i = 0, len = this.length; i < len; i += 1) {
                if (this.hasOwnProperty(i)) {
                    fn.call(scope, this[i], i, this);
                }
            }
        };
    }

    var el = $('.circle-chart'),
        cc;

    test("Test that creating an object works", function () {
        if (cc === undefined) {
            cc = new CircleChart(el);
        }
        equal('object', typeof cc, "cc should be an object");
    });

    test("Test that constructor can create paper.", function () {
        if (cc === undefined) { cc = new CircleChart(el); }
        equal('object', typeof cc.paper, "cc should have paper");
    });

    test("Test that init() creates HTML structure.", function () {
        if (cc === undefined) { cc = new CircleChart(el); }
        equal($('.circle-chart__text').innerHTML, '66.7%');
    });

    test("Test that constructor creates shapes attribute.", function () {
        var shapes;
        if (cc === undefined) { cc = new CircleChart(el); }
        equal('object', typeof cc.shapes, "cc should have shapes");
        shapes = cc.shapes;
        equal('object', typeof shapes.circ);
        equal('object', typeof shapes.track);
        equal('object', typeof shapes.outer);
    });

}());