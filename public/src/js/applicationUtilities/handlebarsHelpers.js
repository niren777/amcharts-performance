/* global define*/

define([
  'require',
  'handlebars'
], function (require,
             Handlebars) {
  'use strict';

  Handlebars.registerHelper('isEqual', function (value1, value2) {
    return value1 === value2;
  });
});
