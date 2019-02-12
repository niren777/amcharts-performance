/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var thisModule = this;
  exports.SummaryModel = Backbone.Model.extend({
    defaults: {
      selectedFilter: {
        id: '',
        dateRange: ''
      },
      filteredActions: []
    }
  });

  exports.summaryModel = new thisModule.SummaryModel();
});
