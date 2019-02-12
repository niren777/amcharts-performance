/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var SettingsModel = Backbone.Model.extend({
    defaults: {
      temperatureUnit: 'C',
      homePage: null,
      defaultActionsMode: {
        startTag: '',
        stopTag: '',
        enableTag: '',
        addCheckpoint: '',
        checkStatusNFC: '',
        readData: ''
      },
      currentMode: {}
    }
  });

  exports.settingsModelObj = new SettingsModel();
});
