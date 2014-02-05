/**
 * Circle Chart.
 *
 * James Sinclair
 * November 2013
 */
/*jslint browser:true, nomen:true*/
/*globals module, Raphael*/

var CircleChart = (function () {
    "use strict";

    var defaults = {
        stroke:         20,
        maxVal:         100,
        colour:         '#56b7d6',
        animationSpeed: 750,
        edgeWidth:      0,
        edgeGap:        undefined,
        edgeColour:     '#56b7d6',
        trackColour:    'transparent'
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
        var w, txt, val, paper, config, observer, cc;

        cc = this;

        // Element
        this.elem = elem;

        // Defaults
        this.opts = extend({}, defaults, opts);

        w   = elem.clientWidth;
        txt = elem.innerHTML.trim();
        val = parseFloat(elem.textContent.trim());

        // Adde event listener
        elem.addEventListener('resize', this.onresize);
        elem.addEventListener('click', this.onresize);

        this.val = 0;
        this.w   = w;

        elem.innerHTML = '<div class="circle-chart__text">' + txt + '</div>';
        this.inner = $('.circle-chart__text');

        elem.setAttribute('style', 'font-size: ' + (0.25 * w) + 'px');

        // Create SVG/VML containers
        paper      = Raphael(elem, w, w);
        this.paper = paper;
        paper.customAttributes.arc = arc;

        this.createShapes();

        /**
         * Watch for resize event.
         */
        if (window.MutationObserver) {
            elem.setAttribute('data-orig-width', w);
            config  = {
                attributes: true,
                childList: false,
                characterData: false
            };
            observer = new window.MutationObserver(function (mutations) {
                cc.resize();
            });
            observer.observe(elem, config);
        }

        this.changeValue(val);
    };


    /**
     * Create border
     */
    CircleChart.prototype.createBorder = function () {
        var paper  = this.paper,
            w      = this.w,
            s      = this.opts.edgeWidth,
            circle = paper.circle((w / 2), (w / 2), (w / 2) - (s / 2));
        circle.attr({
            stroke: this.opts.edgeColour,
            "stroke-width": s
        });
        return circle;
    };


    /**
     * Update border
     */
    CircleChart.prototype.updateBorder = function (speed, anim) {
        var cc     = this,
            paper  = cc.paper,
            w      = cc.w,
            s      = cc.opts.edgeWidth,
            circle = cc.shapes.outer,
            params = {
                "stroke":       cc.opts.edgeColour,
                "stroke-width": s,
                "cx":           (w / 2),
                "cy":           (w / 2),
                "r":            (w / 2) - (s / 2)
            };
        if (anim) {
            circle.animateWith(cc.shapes.track, anim, params);
        }
        circle.animate(params, speed);
        return circle;
    };


    /**
     * Create track
     */
    CircleChart.prototype.createTrack = function () {
        var paper = this.paper,
            w     = this.w,
            s     = this.opts.stroke,
            ew    = this.opts.edgeWidth,
            eg    = (this.opts.edgeGap === undefined) ? ew : this.opts.edgeGap,
            r     = (w / 2) - (this.opts.stroke / 2) - (ew + eg),
            track = paper.circle((w / 2), (w / 2), r);
        track.attr({
            stroke:         this.opts.trackColour,
            "stroke-width": s
        });
        return track;
    };


    /**
     * Update track
     */
    CircleChart.prototype.updateTrack = function (speed) {
        var cc    = this,
            track = cc.shapes.track,
            w     = cc.w,
            s     = cc.opts.stroke,
            ew    = cc.opts.edgeWidth,
            eg    = (cc.opts.edgeGap === undefined) ? ew : cc.opts.edgeGap,
            r     = (w / 2) - (this.opts.stroke / 2) - (ew + eg),
            anim  = Raphael.animation({
                        "r"           : r,
                        "stroke-width": s,
                        "cx"          : (w / 2),
                        "cy"          : (w / 2)
                    }, speed);
        track.animate(anim);
        return anim;
    };


    /**
     * Create shapes
     */
    CircleChart.prototype.createShapes = function () {
        var paper = this.paper,
            w     = this.w,
            s     = this.opts.stroke,
            ew    = this.opts.edgeWidth,
            eg    = (this.opts.edgeGap === undefined) ? ew : this.opts.edgeGap,
            r     = (w / 2) - (s / 2) - (ew + eg);
        this.shapes = {};

        // Create circular border.
        this.shapes.outer = this.createBorder();

        // Create track.
        this.shapes.track = this.createTrack();

        // Create the chart path.
        this.shapes.circ = paper.path("M" + (w / 2) + " " + (s / 2));
        this.shapes.circ.attr({
            "stroke-width": this.opts.stroke,
            stroke:         this.opts.colour,
            arc:            [(w / 2), (w / 2), 0, this.opts.maxVal, r]
        });
    };

    /**
     * Change value with an animation.
     */
    CircleChart.prototype.changeValue = function (val, animTime, callback, anim) {
        var s      = this.opts.stroke,
            w      = this.w,
            ew     = this.opts.edgeWidth,
            eg     = (this.opts.edgeGap === undefined) ? ew : this.opts.edgeGap,
            r      = (w / 2) - (s / 2) - (ew + eg),
            speed  = (animTime !== undefined) ? animTime : this.opts.animationSpeed,
            params = {arc: [(w / 2), (w / 2), val, this.opts.maxVal, r]},
            circ   = this.shapes.circ;
        if (anim) {
            circ.animateWith(
                this.shapes.track,
                anim,
                params,
                speed,
                'linear',
                callback
            );
        } else {
            circ.animate(params,speed, 'ease-in-out', callback);
        }
    };


    /**
     * Respond to a resize.
     */
    CircleChart.prototype.resize = function () {
        var cc    = this,
            elem  = cc.elem,
            w     = elem.clientWidth,
            spd   = cc.opts.animationSpeed,
            paper = cc.paper,
            anim;
        cc.w = w;
        paper.setSize(w, w);
        cc.shapes.circ.stop();
        anim = cc.updateTrack(spd);
        cc.updateBorder(spd, anim);
        cc.changeValue(parseFloat(cc.inner.innerHTML), spd, undefined, anim);
    };

    return CircleChart;

}());
