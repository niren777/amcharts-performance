/* global define, accountsServer, freshtimeCloud, Auth0Lock, AUTH0_CLIENT_ID, AUTH0_DOMAIN*/
/* global mixpanel, powerbi, Auth0Cordova, PACKAGE_IDENTIFIER, ENVIRONMENT_NAMESPACE*/
define([
  'require',
  'exports',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'js/app'
], function (require,
             exports,
             $,
             _,
             Backbone,
             Marionette,
             app) {
  'use strict';

  exports.LandingPageView = Marionette.View.extend({
    render: function () {
      this.el.innerHTML = '<button style="margin-top:10%; left: 20%" class="btn btn-md waves-effect" id="buttonId">Click here!</button>';
    },
    events: {
      'click #buttonId': 'showStatus'
    },
    showStatus: function () {
      console.log('status here...');
      app.FTMobile.AppRouter.navigate('summary/checkStatus', { trigger: true });
    }
  });
});
