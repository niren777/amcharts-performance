/* global define, am4core, am4charts, am4themes_animated*/

define([
  'exports',
  'marionette',
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'materialize',
  'js/constants/checkStatusData',
  'js/models/settingsModel',
  'js/models/tagDetailsModel',
  'templates/compiledTemplates',
  'amcharts.am4core',
  'amcharts.am4charts',
  'amcharts.am4themesAnimated'
], function (
  exports,
  Marionette,
  $,
  _,
  Backbone,
  moment,
  materialize,
  checkStatusData,
  settingsModel,
  tagDetailsModel,
  compiledTemplates
) {
  exports.CheckStatusSummary = Marionette.View.extend({
    initialize: function () {
      this.checkStatusActions = checkStatusData.statusData;
      this.lastestActions = _.sortBy(this.checkStatusActions, function (data) {
        return -data.tagJson.eventTime;
      });

      this.tagIds = this.lastestActions.map(function (action) {
        return action.tagJson.tagId.slice(-4);
      });
      this.temperatureUnit = settingsModel.settingsModelObj.get('temperatureUnit');
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/checkStatusSummaryTpl.hbs']({
        temperatureUnit: this.temperatureUnit,
        templateState: 'showChart'
      });
    },
    onAttach: function () {
      var self = this;
      $('ul.tabs').tabs();
      $('#appBar').parent().removeClass('cyan ');
      $('#appBar').parent().addClass('white appbar-black-text ');
      setTimeout(function () {
        if (self.checkStatusActions.length) {
          self.renderTagTypeChart();
          self.renderPointsRemainingChart();
          self.renderTemperatureChart();
          self.renderAlertsChart();
        }
      });
    },
    events: {
      'click #dataDistribution li.tab a ': 'toggleTemperatureUnitVisibility',
      'change #unitSwitch': function (event) {
        if (event.target.checked) {
          this.temperatureUnit = 'F';
        } else {
          this.temperatureUnit = 'C';
        }
        $(this.el).find('.temperature-tab a, #temperature .temperature-label-text').html('Temperature (&deg;' + this.temperatureUnit + ')');
        this.renderTemperatureChart();
      }
    },
    renderTagTypeChart: function () {
      var chart;
      var marker;
      var tagWhatAxis;
      var senseAxis;
      var Log;
      var Points;
      var labels;
      var chartData;
      var groupEachTagWhatBySensingModel;
      var groupByTagWhatWithAllLables;
      var groupByTagWhat;

      am4core.options.commercialLicense = true;
      chart = am4core.create('tagTypeContainer', am4charts.XYChart);
      tagWhatAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      senseAxis = chart.xAxes.push(new am4charts.ValueAxis());
      Log = chart.series.push(new am4charts.ColumnSeries());
      Points = chart.series.push(new am4charts.ColumnSeries());
      // var Undefined = chart.series.push(new am4charts.ColumnSeries());

      labels = ['Unidentified', 'Trip', 'Space', 'Product'];
      chartData = [];
      groupEachTagWhatBySensingModel = {};
      groupByTagWhatWithAllLables = {};
      groupByTagWhat = _.groupBy(this.checkStatusActions, function (checkStatusAction) {
        return checkStatusAction.tagJson.eventData.tagInfo &&
          checkStatusAction.tagJson.eventData.tagInfo.tagWhat;
      });
      groupByTagWhat.Unidentified = groupByTagWhat.Unidentified || [];
      if (groupByTagWhat.Undefined) {
        groupByTagWhat.Unidentified = groupByTagWhat.Unidentified.concat(groupByTagWhat.Undefined);
        delete groupByTagWhat.Undefined;
      }
      if (groupByTagWhat.undefined) {
        groupByTagWhat.Unidentified = groupByTagWhat.Unidentified.concat(groupByTagWhat.undefined);
        delete groupByTagWhat.undefined;
      }

      groupEachTagWhatBySensingModel = _.mapObject(groupByTagWhat, function (actions) {
        return _.groupBy(actions, function (action) {
          return action.tagJson.eventData.tagInfo &&
           action.tagJson.eventData.tagInfo.sensingModel;
        });
      });

      labels.map(function (key) {
        groupByTagWhatWithAllLables[key] =
        Object.keys(groupEachTagWhatBySensingModel).indexOf(key) === -1 ? [] :
          groupEachTagWhatBySensingModel[key];
        return null;
      });

      _.mapObject(groupByTagWhatWithAllLables, function (tagWhat, tagWhatKey) {
        var tempObject = {
          tagWhat: tagWhatKey,
          Log: 0,
          Points: 0,
          undefined: 0
        };
        _.each(tagWhat, function (values, key) {
          tempObject[key] = values.length;
        });
        chartData.push(tempObject);
      });

      am4core.useTheme(am4themes_animated);

      chart.padding(5, 0, 0, 0);
      chart.data = chartData;
      chart.legend = new am4charts.Legend();
      chart.legend.fontSize = 17;
      chart.legend.align = 'center';

      marker = chart.legend.markers.template.children.getIndex(0);
      marker.cornerRadius(0, 0, 0, 0);
      marker.scale = 1;

      // CategoryAxis
      tagWhatAxis.dataFields.category = 'tagWhat';
      tagWhatAxis.renderer.grid.template.location = 0;
      tagWhatAxis.title.fontSize = 15;
      tagWhatAxis.renderer.labels.template.fontSize = 12;
      tagWhatAxis.renderer.labels.template.fill = am4core.color('#34495e');
      tagWhatAxis.renderer.grid.template.strokeOpacity = 0.5;
      tagWhatAxis.renderer.grid.template.stroke = am4core.color('#acacac');
      tagWhatAxis.renderer.grid.template.strokeWidth = 1;

      // ValueAxis
      senseAxis.min = 0;
      senseAxis.title.fontSize = 15;
      senseAxis.renderer.baseGrid.disabled = true;
      senseAxis.renderer.minGridDistance = 40;
      senseAxis.renderer.labels.template.fontSize = 12;
      senseAxis.renderer.labels.template.fill = am4core.color('#34495e');
      senseAxis.renderer.grid.template.strokeOpacity = 0.5;
      senseAxis.renderer.grid.template.stroke = am4core.color('#acacac');
      senseAxis.renderer.grid.template.strokeWidth = 1;

      Log.columns.template.width = am4core.percent(80);
      Log.columns.template.tooltipText = '{categoryY}\n{name}: {valueX.value}';
      Log.name = 'Log';
      Log.dataFields.categoryY = 'tagWhat';
      Log.dataFields.valueX = 'Log';
      Log.stacked = true;
      Log.tooltip.pointerOrientation = 'vertical';
      Log.columns.template.strokeOpacity = 0;
      Log.columns.template.fill = am4core.color('#f05b4f');
      Log.columns.template.stroke = am4core.color('#f05b4f');
      Log.tooltip.disabled = true;

      Points.columns.template.width = am4core.percent(80);
      Points.columns.template.tooltipText = '{categoryY}\n{name}: {valueX.value}';
      Points.columns.template.strokeOpacity = 0;
      Points.name = 'Points';
      Points.dataFields.categoryY = 'tagWhat';
      Points.dataFields.valueX = 'Points';
      Points.stacked = true;
      Points.tooltip.pointerOrientation = 'vertical';
      Points.columns.template.fill = am4core.color('#d70206');
      Points.columns.template.stroke = am4core.color('#d70206');
      Points.tooltip.disabled = true;

      // Undefined.columns.template.width = am4core.percent(80);
      // Undefined.columns.template.tooltipText = '{categoryY}\n{name}: {valueX.value}';
      // Undefined.name = 'Undefined';
      // Undefined.dataFields.categoryY = 'tagWhat';
      // Undefined.dataFields.valueX = 'undefined';
      // Undefined.stacked = true;
      // Undefined.columns.template.strokeOpacity = 0;
      // Undefined.tooltip.pointerOrientation = 'vertical';
      // Undefined.columns.template.fill = am4core.color('#F4C63D');
    },
    renderPointsRemainingChart: function () {
      var chart;
      var pointsAxis;
      var noOfTagsAxis;
      var pointsRemainingSeries;
      var iteratee;
      var interval = 10;
      var endPoint = 100;
      var startPoint = 0;
      var endPointRange;
      var startPointRange;
      var tagCount;
      var chartData = [];
      var pointCountData;
      var self = this;
      am4core.options.commercialLicense = true;
      chart = am4core.create('pointsRemainingChart', am4charts.XYChart);
      pointsAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      noOfTagsAxis = chart.yAxes.push(new am4charts.ValueAxis());
      pointsRemainingSeries = chart.series.push(new am4charts.ColumnSeries());
      pointCountData = _.chain(this.lastestActions)
        .filter(function (action) {
          return action.tagJson.eventData.tagStatus.life && action;
        // }).groupBy(function (action) {
        //   return action.tagJson.tagId;
        // }).map(function (group) {
        //   return _.last(_.sortBy(group, function (event) { return event.tagJson.eventTime; }));
        })
        .countBy(function (action) {
          return action.tagJson.eventData.tagStatus.life;
        })
        .value();
      function filterByCondition(count, point) {
        return startPointRange <= Number(point) && Number(point) <= endPointRange;
      }
      for (iteratee = startPoint; iteratee < endPoint; iteratee += interval) {
        startPointRange = (iteratee) + 1;
        endPointRange = (iteratee) + interval;
        tagCount = _.reduce(
          _.filter(pointCountData, filterByCondition), function (memo, num) {
            return memo + num;
          }, 0);
        chartData.push({
          tagCount: tagCount,
          points: endPointRange
        });
      }

      am4core.useTheme(am4themes_animated);

      chart.data = chartData;
      chart.padding(5, 0, 0, 0);

      // CategoryAxis
      pointsAxis.min = 0;
      pointsAxis.strictMinMax = true;
      pointsAxis.title.fontSize = 15;
      pointsAxis.dataFields.category = 'points';
      pointsAxis.renderer.labels.template.fontSize = 12;
      pointsAxis.renderer.labels.template.fill = am4core.color('#34495e');
      pointsAxis.renderer.grid.template.strokeOpacity = 0.5;
      pointsAxis.renderer.grid.template.stroke = am4core.color('#acacac');
      pointsAxis.renderer.grid.template.strokeWidth = 1;
      pointsAxis.renderer.grid.template.location = 0;
      pointsAxis.renderer.labels.template.location = 0;
      pointsAxis.cursorTooltipEnabled = false;
      pointsAxis.renderer.labels.template.adapter.add('text', function () {
        return '';
      });

      // ValueAxis
      noOfTagsAxis.renderer.maxLabelPosition = 0.98;
      noOfTagsAxis.title.fontSize = 15;
      noOfTagsAxis.min = 0;
      noOfTagsAxis.strictMinMax = true;
      noOfTagsAxis.renderer.baseGrid.disabled = true;
      noOfTagsAxis.renderer.labels.template.fontSize = 12;
      noOfTagsAxis.renderer.labels.template.fill = am4core.color('#34495e');
      noOfTagsAxis.renderer.grid.template.strokeOpacity = 0.5;
      noOfTagsAxis.renderer.grid.template.stroke = am4core.color('#acacac');
      noOfTagsAxis.renderer.grid.template.strokeWidth = 1;
      noOfTagsAxis.tooltip.disabled = true;
      noOfTagsAxis.cursorTooltipEnabled = false;

      pointsRemainingSeries.dataFields.categoryX = 'points';
      pointsRemainingSeries.dataFields.valueY = 'tagCount';
      pointsRemainingSeries.sequencedInterpolation = true;
      pointsRemainingSeries.defaultState.transitionDuration = 1000;
      pointsRemainingSeries.sequencedInterpolationDelay = 100;

      pointsRemainingSeries.stroke = am4core.color('#d70206');
      pointsRemainingSeries.strokeWidth = 2;

      pointsRemainingSeries.columns.template.fill = am4core.color('#d70206');
      pointsRemainingSeries.columns.template.strokeOpacity = 0;
      pointsRemainingSeries.columns.template.tooltipText = '{valueY.value}';
      pointsRemainingSeries.tooltip.pointerOrientation = 'vertical';
      pointsRemainingSeries.tooltip.disabled = true;

      // To enable click event on cursor so that the data can be shown below the chart
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = pointsAxis;
      chart.cursor.fullWidthLineX = true;
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.lineX.fill = am4core.color('#4f81bc');
      chart.cursor.lineX.fillOpacity = 0.5;
      chart.cursor.lineY.disabled = true;
      chart.zoomOutButton.disabled = true;
      chart.cursor.behavior = 'none';

      chart.events.on('datavalidated', function () {
        var middleHistogram = chartData[Math.floor(chartData.length / 2)];
        var point = pointsAxis.categoryToPoint(middleHistogram.points);
        setTimeout(function () {
          chart.cursor.triggerMove(point, true);
        }, 100);
      });

      chart.cursor.events.on('cursorpositionchanged', function (ev) {
        var ponintsToShow;
        var startRange;
        var selectedCategoryValue;
        var currentHistogramIndex;
        var currentHistogram = pointsAxis.getSeriesDataItem(pointsRemainingSeries,
          pointsAxis.toAxisPosition(ev.target.xPosition));
        if (currentHistogram) {
          selectedCategoryValue =
            currentHistogram._dataContext.points; // eslint-disable-line no-underscore-dangle
          currentHistogramIndex = _.findIndex(chartData, function (histogramObj) {
            return histogramObj.points === selectedCategoryValue;
          });
          if (currentHistogramIndex >= 0) {
            startRange = currentHistogramIndex === 0 ? startPoint :
              chartData[currentHistogramIndex - 1].points;
            ponintsToShow = startRange + ' to ' + selectedCategoryValue;
            console.log(currentHistogram.values.valueY.value,
              currentHistogram._dataContext.points); // eslint-disable-line no-underscore-dangle
            self.$el.find('#pointsRemainingValue')[0].innerHTML = ponintsToShow + ' pts';
          }
          self.$el.find('#pointsNoOfTags')[0].innerHTML = currentHistogram.values.valueY.value;
        }
      });
    },
    renderTemperatureChart: function () {
      var chart;
      var temperatureAxis;
      var noOfTagsAxis;
      var temperatureSeries;
      var self = this;
      var iteratee;
      var interval = 10;
      var startTemperature = -30;
      var endTemperature = 70;
      var startTemperatureRange;
      var endTemperatureRange;
      var tagCount;
      var chartData = [];
      var temperatureCountData;

      am4core.options.commercialLicense = true;
      chart = am4core.create('temperatureChart', am4charts.XYChart);
      temperatureAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      noOfTagsAxis = chart.yAxes.push(new am4charts.ValueAxis());
      temperatureSeries = chart.series.push(new am4charts.ColumnSeries());

      temperatureCountData = _.chain(this.lastestActions)
        .map(function (action) {
          action.tagJson.eventData.tagStatus.temperature =
            action.tagJson.eventData.tagStatus.temperature ?
            action.tagJson.eventData.tagStatus.temperature :
            0;
          return action;
        // }).groupBy(function (action) {
        //   return action.tagJson.tagId;
        // }).map(function (group) {
        //   return _.last(_.sortBy(group, function (event) { return event.tagJson.eventTime; }));
        })
        .countBy(function (action) {
          return action.tagJson.eventData.tagStatus.temperature;
        })
        .value();
      function filterByCondition(count, temperature) {
        return startTemperatureRange < Number(temperature) &&
          Number(temperature) <= endTemperatureRange;
      }
      for (iteratee = startTemperature; iteratee < endTemperature; iteratee += interval) {
        startTemperatureRange = (iteratee) + 1;
        endTemperatureRange = (iteratee) + interval;
        tagCount = _.reduce(
          _.filter(temperatureCountData, filterByCondition), function (memo, num) {
            return memo + num;
          }, 0);
        chartData.push({
          tagCount: tagCount,
          temperature: endTemperatureRange
        });
      }
      // _.each(chartData, function (action) {
      //   action.temperature = commonFunctions.convertTemperature(self.temperatureUnit,
      //       action.temperature);
      // });

      am4core.useTheme(am4themes_animated);

      chart.data = chartData;
      chart.padding(5, 0, 0, 0);

      // CategoryAxis
      temperatureAxis.renderer.labels.template.fontSize = 12;
      temperatureAxis.dataFields.category = 'temperature';
      temperatureAxis.min = 0;
      temperatureAxis.strictMinMax = true;
      temperatureAxis.title.fontSize = 15;
      temperatureAxis.renderer.labels.template.fontSize = 12;
      temperatureAxis.renderer.labels.template.fill = am4core.color('#34495e');
      temperatureAxis.renderer.grid.template.strokeOpacity = 0.5;
      temperatureAxis.renderer.grid.template.stroke = am4core.color('#acacac');
      temperatureAxis.renderer.grid.template.strokeWidth = 1;
      temperatureAxis.renderer.grid.template.location = 0;
      temperatureAxis.renderer.labels.template.location = 1;
      temperatureAxis.cursorTooltipEnabled = false;
      temperatureAxis.renderer.labels.template.adapter.add('text', function () {
        return '';
      });

      // ValueAxis
      noOfTagsAxis.title.fontSize = 15;
      noOfTagsAxis.min = 0;
      noOfTagsAxis.strictMinMax = true;
      noOfTagsAxis.renderer.baseGrid.disabled = true;
      noOfTagsAxis.renderer.maxLabelPosition = 0.98;
      noOfTagsAxis.renderer.labels.template.fontSize = 12;
      noOfTagsAxis.renderer.labels.template.fill = am4core.color('#34495e');
      noOfTagsAxis.renderer.grid.template.strokeOpacity = 0.5;
      noOfTagsAxis.renderer.grid.template.stroke = am4core.color('#acacac');
      noOfTagsAxis.renderer.grid.template.strokeWidth = 0.7;
      noOfTagsAxis.tooltip.disabled = true;
      noOfTagsAxis.cursorTooltipEnabled = false;

      temperatureSeries.dataFields.categoryX = 'temperature';
      temperatureSeries.dataFields.valueY = 'tagCount';
      temperatureSeries.columns.template.tooltipText = '{valueY.value}';
      temperatureSeries.sequencedInterpolation = true;
      temperatureSeries.defaultState.transitionDuration = 1000;
      temperatureSeries.sequencedInterpolationDelay = 100;
      temperatureSeries.columns.template.strokeOpacity = 0;
      temperatureSeries.tooltip.pointerOrientation = 'vertical';
      temperatureSeries.columns.template.fill = am4core.color('#d70206');
      temperatureSeries.tooltip.disabled = true;

      setTimeout(function () {
        if ($(self.el).find('.distribution-tab a.active').attr('href') === '#pointsRemaining') {
          $(self.el).find('#temperature').css('display', 'none');
        }
      }, 100);
      // To enable click event on cursor so that the data can be shown below the chart
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = temperatureAxis;
      chart.cursor.fullWidthLineX = true;
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.lineX.fill = am4core.color('#4f81bc');
      chart.cursor.lineX.fillOpacity = 0.5;
      chart.cursor.lineY.disabled = true;
      chart.zoomOutButton.disabled = true;
      chart.cursor.behavior = 'none';

      chart.events.on('datavalidated', function () {
        var middleHistogram = chartData[Math.floor(chartData.length / 2)];
        var point = temperatureAxis.categoryToPoint(middleHistogram.temperature);
        setTimeout(function () {
          chart.cursor.triggerMove(point, true);
        }, 100);
      });

      chart.cursor.events.on('cursorpositionchanged', function (ev) {
        var startRange;
        var histogramToShow;
        var selectedCategoryValue;
        var currentHistogramIndex;
        var currentHistogram = temperatureAxis.getSeriesDataItem(temperatureSeries,
          temperatureAxis.toAxisPosition(ev.target.xPosition));
        if (currentHistogram) {
          selectedCategoryValue =
            currentHistogram._dataContext.temperature; // eslint-disable-line no-underscore-dangle
          currentHistogramIndex =
            _.findIndex(chartData, function (histogramObj) {
              return histogramObj.temperature === selectedCategoryValue;
            });
          if (currentHistogramIndex >= 0) {
            startRange = currentHistogramIndex === 0 ? startTemperature :
              chartData[currentHistogramIndex - 1].temperature;
            histogramToShow = startRange + ' to ' + selectedCategoryValue;
            self.$el.find('#temperatureValue')[0].innerHTML =
              histogramToShow + '°' + self.temperatureUnit;
          }
          self.$el.find('#temperatureNoOfTags')[0].innerHTML =
            currentHistogram.values.valueY.value;
        }
      });
    },
    renderAlertsChart: function () {
      var chart;
      var marker;
      var tagIdAxis;
      var noOfAlertsAxis;
      var lifeAlerts;
      var tempAlerts;
      var elapsedAlerts;
      var powerAlerts;
      var legendContainer;
      var self = this;
      // var isAlerts = false;
      var chartData = new Array(57);
      var allAlertsData;
      var alerts;
      var initialData = {
        lifeAlerts: 0,
        tempAlerts: 0,
        elapsedAlerts: 0,
        powerAlerts: 0,
        totalAlerts: 0,
        tagId: '',
        eventTime: undefined
      };
      var i;
      var tempData;

      am4core.options.commercialLicense = true;
      chart = am4core.create('alertsChartContainer', am4charts.XYChart);
      tagIdAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      noOfAlertsAxis = chart.yAxes.push(new am4charts.ValueAxis());
      lifeAlerts = chart.series.push(new am4charts.ColumnSeries());
      tempAlerts = chart.series.push(new am4charts.ColumnSeries());
      elapsedAlerts = chart.series.push(new am4charts.ColumnSeries());
      powerAlerts = chart.series.push(new am4charts.ColumnSeries());
      legendContainer = am4core.create('alertLegendDiv', am4core.Container);

      allAlertsData = this.lastestActions.map(function (action, index) {
        alerts = JSON.parse(JSON.stringify(initialData));
        alerts.tagId = action.tagJson.tagId + '-' + index;
        alerts.eventTime = action.tagJson.eventTime;
        if (action.tagJson.eventData.tagStatus.alerts) {
          _.each(action.tagJson.eventData.tagStatus.alerts.summary, function (value, key) {
            if (value) {
              alerts[key.slice(0, -1) + 's'] += 1;
              alerts.totalAlerts += 1;
              // isAlerts = true;
            }
          });
        }
        return alerts;
      });
      for (i = 0; i <= 130; i++) {
        tempData = {
          lifeAlerts: Math.floor(Math.random() * 10),
          tempAlerts: Math.floor(Math.random() * 10),
          elapsedAlerts: Math.floor(Math.random() * 10),
          powerAlerts: Math.floor(Math.random() * 10),
          totalAlerts: Math.floor(Math.random() * 10),
          tagId: '',
          eventTime: undefined
        };
        alerts = JSON.parse(JSON.stringify(tempData));
        alerts.tagId = 'Sep ' + i;
        allAlertsData.push(alerts);
      }
      // if (isAlerts) {
      if (allAlertsData.length < 57) {
        _.map(chartData, function (value, index) {
          chartData[index] = allAlertsData[index];
          if (!allAlertsData[index]) {
            alerts = JSON.parse(JSON.stringify(initialData));
            alerts.tagId = '-' + index;
            chartData[index] = alerts;
          }
        });
      } else {
        chartData = allAlertsData;
      }

      am4core.useTheme(am4themes_animated);

      chart.data = chartData;
      chart.padding(5, 0, 0, 0);
      chart.legend = new am4charts.Legend();
      chart.legend.fontSize = 16;
      chart.zoomOutButton.disabled = true;
      /* Create a separate container to put legend in */
      legendContainer.width = am4core.percent(100);
      legendContainer.height = am4core.percent(100);
      chart.legend.parent = legendContainer;
      chart.legend.width = 300;
      chart.legend.align = 'center';

      marker = chart.legend.markers.template.children.getIndex(0);
      marker.cornerRadius(0, 0, 0, 0);
      marker.scale = 1;

      // CategoryAxis
      tagIdAxis.dataFields.category = 'tagId';
      tagIdAxis.title.fontSize = 15;
      tagIdAxis.renderer.grid.template.location = 0;
      tagIdAxis.renderer.labels.template.fontSize = 12;
      tagIdAxis.renderer.labels.template.fill = am4core.color('#34495e');
      tagIdAxis.renderer.grid.template.strokeOpacity = 0.5;
      tagIdAxis.renderer.grid.template.stroke = am4core.color('#acacac');
      tagIdAxis.renderer.grid.template.strokeWidth = 1;
      tagIdAxis.renderer.labels.template.adapter.add('text', function () {
        // label = target.dataItem.category && target.dataItem.category.split('-')[0];
        // return label && '..' + label.slice(-4);
        return '';
      });
      tagIdAxis.cursorTooltipEnabled = false;

      // ValueAxis
      noOfAlertsAxis.title.fontSize = 15;
      noOfAlertsAxis.renderer.baseGrid.disabled = true;
      noOfAlertsAxis.renderer.labels.template.fontSize = 12;
      noOfAlertsAxis.renderer.labels.template.fill = am4core.color('#34495e');
      noOfAlertsAxis.renderer.grid.template.strokeOpacity = 0.5;
      noOfAlertsAxis.renderer.grid.template.stroke = am4core.color('#acacac');
      noOfAlertsAxis.renderer.grid.template.strokeWidth = 1;
      noOfAlertsAxis.cursorTooltipEnabled = false;

      lifeAlerts.columns.template.width = am4core.percent(100);
      lifeAlerts.columns.template.tooltipText = '{name}: {valueY.value}';
      lifeAlerts.name = 'Points';
      lifeAlerts.dataFields.categoryX = 'tagId';
      lifeAlerts.dataFields.valueY = 'lifeAlerts';
      lifeAlerts.stacked = true;
      lifeAlerts.tooltip.pointerOrientation = 'vertical';
      lifeAlerts.columns.template.strokeWidth = 1;
      lifeAlerts.columns.template.stroke = 'white';
      lifeAlerts.tooltipText = '{valueY}';
      lifeAlerts.legendSettings.valueText = '{valueY.close}';
      lifeAlerts.legendSettings.itemValueText = '({valueY})';
      // lifeAlerts.columns.template.strokeOpacity = 0;
      lifeAlerts.columns.template.fill = am4core.color('#d70206');
      lifeAlerts.tooltip.disabled = true;
      lifeAlerts.columns.template.column.cornerRadiusTopLeft = 3;
      lifeAlerts.columns.template.column.cornerRadiusTopRight = 3;
      lifeAlerts.columns.template.column.cornerRadiusBottomLeft = 3;
      lifeAlerts.columns.template.column.cornerRadiusBottomRight = 3;

      tempAlerts.columns.template.width = am4core.percent(100);
      tempAlerts.columns.template.tooltipText = '{name}: {valueY.value}';
      tempAlerts.name = 'Temperature';
      tempAlerts.dataFields.categoryX = 'tagId';
      tempAlerts.dataFields.valueY = 'tempAlerts';
      tempAlerts.stacked = true;
      tempAlerts.tooltip.pointerOrientation = 'vertical';
      tempAlerts.columns.template.strokeWidth = 1;
      tempAlerts.columns.template.stroke = 'white';
      tempAlerts.tooltipText = '{valueY}';
      tempAlerts.legendSettings.valueText = '{valueY.close}';
      tempAlerts.legendSettings.itemValueText = '({valueY})';
      // tempAlerts.columns.template.strokeOpacity = 0;
      tempAlerts.columns.template.fill = am4core.color('#f05b4f');
      tempAlerts.tooltip.disabled = true;
      tempAlerts.columns.template.column.cornerRadiusTopLeft = 3;
      tempAlerts.columns.template.column.cornerRadiusTopRight = 3;
      tempAlerts.columns.template.column.cornerRadiusBottomLeft = 3;
      tempAlerts.columns.template.column.cornerRadiusBottomRight = 3;

      elapsedAlerts.columns.template.width = am4core.percent(100);
      elapsedAlerts.columns.template.tooltipText = '{name}: {valueY.value}';
      elapsedAlerts.name = 'Elapsed';
      elapsedAlerts.dataFields.categoryX = 'tagId';
      elapsedAlerts.dataFields.valueY = 'elapsedAlerts';
      elapsedAlerts.stacked = true;
      elapsedAlerts.tooltip.pointerOrientation = 'vertical';
      elapsedAlerts.columns.template.strokeWidth = 1;
      elapsedAlerts.columns.template.stroke = 'white';
      elapsedAlerts.tooltipText = '{valueY}';
      elapsedAlerts.legendSettings.valueText = '{valueY.close}';
      elapsedAlerts.legendSettings.itemValueText = '({valueY})';
      // elapsedAlerts.columns.template.strokeOpacity = 0;
      elapsedAlerts.columns.template.fill = am4core.color('#f4c63d');
      elapsedAlerts.tooltip.disabled = true;
      elapsedAlerts.columns.template.column.cornerRadiusTopLeft = 3;
      elapsedAlerts.columns.template.column.cornerRadiusTopRight = 3;
      elapsedAlerts.columns.template.column.cornerRadiusBottomLeft = 3;
      elapsedAlerts.columns.template.column.cornerRadiusBottomRight = 3;

      powerAlerts.columns.template.width = am4core.percent(100);
      powerAlerts.columns.template.tooltipText = '{name}: {valueY.value}';
      powerAlerts.name = 'Power';
      powerAlerts.dataFields.categoryX = 'tagId';
      powerAlerts.dataFields.valueY = 'powerAlerts';
      powerAlerts.stacked = true;
      powerAlerts.tooltip.pointerOrientation = 'vertical';
      powerAlerts.columns.template.strokeWidth = 1;
      powerAlerts.columns.template.stroke = 'white';
      powerAlerts.tooltipText = '{valueY}';
      powerAlerts.legendSettings.valueText = '{valueY.close}';
      powerAlerts.legendSettings.itemValueText = '({valueY})';
      // powerAlerts.columns.template.strokeOpacity = 0;
      powerAlerts.columns.template.fill = am4core.color('#d17905');
      powerAlerts.tooltip.disabled = true;
      powerAlerts.columns.template.column.cornerRadiusTopLeft = 3;
      powerAlerts.columns.template.column.cornerRadiusTopRight = 3;
      powerAlerts.columns.template.column.cornerRadiusBottomLeft = 3;
      powerAlerts.columns.template.column.cornerRadiusBottomRight = 3;

      // To enable click event on cursor so that the data can be shown below the chart
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = tagIdAxis;
      chart.cursor.fullWidthLineX = true;
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.lineX.fill = am4core.color('#4f81bc');
      chart.cursor.lineX.fillOpacity = 0.5;
      chart.cursor.lineY.disabled = true;
      chart.cursor.behavior = 'panX';
      chart.zoomOutButton.disabled = true;
      chart.events.on('datavalidated', function () {
        var middleHistogram = chartData[Math.floor(chartData.length / 2)];
        var point = tagIdAxis.categoryToPoint(middleHistogram.tagId);
        setTimeout(function () {
          chart.cursor.triggerMove(point, true);
        }, 100);
        tagIdAxis.zoomToCategories(chartData[0].tagId, chartData[56].tagId, false, true);
      });

      chart.cursor.events.on('cursorpositionchanged', function (ev) {
        var tagId;
        var currentHistogram = tagIdAxis.getSeriesDataItem(lifeAlerts,
          tagIdAxis.toAxisPosition(ev.target.xPosition));
        var totalAlertsString;
        var eventTimeString;
        if (currentHistogram) {
          if (currentHistogram._dataContext.eventTime) { // eslint-disable-line no-underscore-dangle
            totalAlertsString = currentHistogram._dataContext.totalAlerts + ' Alerts'; // eslint-disable-line no-underscore-dangle
            tagId = currentHistogram._dataContext.tagId.split('-')[0]; // eslint-disable-line no-underscore-dangle
            // tagId ? tagId.slice(0, 4) + '....' + tagId.slice(-10) : '';
            eventTimeString = moment(currentHistogram._dataContext.eventTime).format('Do MMMM YYYY, </br> hh:mm A'); // eslint-disable-line no-underscore-dangle
            self.$el.find('#chartDetails')[0].innerHTML = '<h4 class="details-unit">' + totalAlertsString + '</h4>';
            self.$el.find('#chartDetails')[0].innerHTML += '<h6 class="details-type epc-details-type">' + tagId + '</h6>';
            self.$el.find('#timeDetails')[0].innerHTML = '<i class="icon-calendar"></i> <span id="eventTime">' + eventTimeString + '</span>';
          } else {
            self.$el.find('#chartDetails')[0].innerHTML = '<h1>-</h1>';
            self.$el.find('#timeDetails')[0].innerHTML = '<h1>-</h1>';
          }
        }
      });
      // } else {
      //   $(this.el).find('#noAlertsMessage').removeClass('hide');
      //   $(this.el).find('#alerts .label-text').addClass('hide');
      // }
    },
    toggleTemperatureUnitVisibility: function (event) {
      var targetId = $(event.target).closest('a').attr('href');
      if (targetId === '#temperatureTab') {
        $(this.el).find('#temperature').css('display', 'block');

        $(this.el).find('#unitSwitch').removeClass('hide');
      } else {
        $(this.el).find('#temperature').css('display', 'none');

        $(this.el).find('#unitSwitch').addClass('hide');
      }
    },
    onDestroy: function () {
      $('#appBar').parent().removeClass('white appbar-black-text ').addClass('cyan ');
    }
  });
});
