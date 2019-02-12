/* global requirejs, AmCharts*/

requirejs.config({
  paths: {
    js: '.',
    templates: '../templates',
    jquery: '../lib/js/jquery.min',
    jqueryMobile: '../lib/js/jquery.mobile.custom',
    underscore: '../lib/js/underscore.min',
    backbone: '../lib/js/backbone',
    handlebars: '../lib/js/handlebars',
    marionette: '../lib/js/backbone.marionette.min',
    'backbone.radio': '../lib/js/backbone.radio',
    // date libraries
    moment: '../lib/js/moment',
    humanizeDuration: '../lib/js/humanize-duration',
    materialize: '../lib/js/materialize',
    hammer: '../lib/js/materialize',
    hammerjs: '../lib/js/hammer.min',
    'jquery-hammerjs': '../lib/js/jquery.hammer',

    // amcharts
    amcharts: '../lib/js/amcharts4',
    'amcharts.am4core': '../lib/js/amcharts4/core',
    'amcharts.am4charts': '../lib/js/amcharts4/charts',
    'amcharts.am4themesAnimated': '../lib/js/amcharts4/themes/animated'
  },
  shim: {
    materialize: {
      deps: ['jquery', 'hammerjs', 'jquery-hammerjs'],
      exports: 'materialize'
    },
    'amcharts.am4core': {
      init: function () {
        return window.am4core;
      }
    },
    'amcharts.am4charts': {
      deps: ['amcharts.am4core'],
      exports: 'amcharts.am4charts',
      init: function () {
        return window.am4charts;
      }
    },
    'amcharts.am4themesAnimated': {
      deps: ['amcharts.am4core'],
      exports: 'amcharts.am4themesAnimated',
      init: function () {
        return window.am4themes_animated;
      }
    }
  },
  waitSeconds: 0
});
require(['js/index']);
