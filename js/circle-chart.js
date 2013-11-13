/**
 * Circle Chart.
 *
 * James Sinclair
 * November 2013
 */
/*jslint browser:true*/
/*globals module, Raphael*/

var CircleChart = (function () {
    "use strict";

    var defaults = {
        stroke:   20,
        maxVal:   100,
        colour:   '#56b7d6'
    };

    /**
     * String trim polyfill.
     */
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    /**
     * Query Selector.
     */
    function $(cssStr) {
        return document.querySelector(cssStr);
    }

    /**
     * Shallow Extend.
     *
     * Modified from http://stackoverflow.com/a/11197343
     */
    function extend() {
        var i, key,
            args = arguments;
        for (i = 1; i < args.length; i += 1) {
            for (key in args[i]) {
                if (args[i].hasOwnProperty(key)) {
                    args[0][key] = args[i][key];
                }
            }
        }
        return args[0];
    }

    /**
     * Arc Function.
     */
    function arc(xloc, yloc, value, total, R) {
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = xloc + R * Math.cos(a),
            y = yloc - R * Math.sin(a),
            path;
        if (total === value) {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
            ];
        } else {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, +(alpha > 180), 1, x, y]
            ];
        }
        return {
            path: path
        };
    }

    /**
     * Constructor.
     */
    CircleChart = function CircleChart(elem, opts) {
        var w, txt, val, paper, circ, r, s;

        // Element
        this.elem = elem;

        // Defaults
        this.opts = extend({}, defaults, opts);

        w   = elem.clientWidth;
        txt = elem.innerHTML.trim();
        val = parseFloat(txt);

        this.val = 0;
        this.w   = w;
        r        = (w / 2) - (this.opts.stroke / 2);
        s        = this.opts.stroke;

        elem.innerHTML = '<div class="circle-chart__text">' + txt + '</div>';
        this.inner = $('.circle-chart__text');

        elem.setAttribute('style', 'font-size: ' + (0.25 * w) + 'px');

        // Create SVG/VML containers
        paper      = Raphael(elem, w, w);
        this.paper = paper;
        paper.customAttributes.arc = arc;

        // initStr = this.getPathTxt(0);
        circ = paper.path("M" + (w / 2) + " " + (s / 2));
        circ.attr({
            "stroke-width": this.opts.stroke,
            stroke:         this.opts.colour,
            arc:            [(w / 2), (w / 2), 0, this.opts.maxVal, r]
        });
        this.circ = circ;

        this.changeValue(val);
    };

    /**
     * Change value with an animation.
     */
    CircleChart.prototype.changeValue = function (val, callback) {
        var s     = this.opts.stroke,
            w     = this.w,
            r     = (w / 2) - (s / 2);
        this.circ.animate(
            {arc: [(w / 2), (w / 2), val, this.opts.maxVal, r]},
            1000,
            'ease-in-out',
            callback
        );
    };


    /**
     * Calcualate Radians
     */
    CircleChart.prototype.calcRads = function (value) {
        return value * 2 * Math.PI;
    };

    return CircleChart;

}());
