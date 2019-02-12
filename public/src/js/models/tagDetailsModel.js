/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var TagDetailsModel = Backbone.Model.extend({
    defaults: {
      currentTag: {},
      fromHistory: false,
      showLastSeenTime: false,
      fromPage: '',
      nfcReaderJson: {},
      summaryId: '',
      history: [],
      notificationMessage: '',
      headerText: 'Home',
      subText: '',
      renderLogDetails: '',
      listOfTags: [],
      selectedFilterOptions: [{
        type: 'actionType',
        optionIds: []
      }, {
        type: 'source',
        optionIds: []
      }, {
        type: 'dateRange',
        optionIds: []
      }, {
        type: 'duplicates',
        optionIds: [],
        values: []
      }],
      mimeTypeValue: 'checkStatus/com.infratab.nfcApp',
      tagSummaryAssociation: [],
      summaryList: [],
      selectedSummariesForDelete: [],
      tagReadsOf: '',
      filteredTagReads: [],
      filteredActions: [],
      selectedTagReadsForDelete: [],
      defaultHistoryJsons: [{
        id: 1,
        date: '2015-10-25T22:47:43+05:30',
        source: 'NFC',
        tagJson: {
          eventData: {
            tagInfo: {
              isThisSpecial: 'No',
              tagWhat: 'Product',
              temperatureRange: 'Cold',
              sensingModel: 'Points'
            },
            productInfo: {
              product: 'Strawberry',
              productionDate: '10/24/2014',
              useByDate: '11/8/2014',
              brandName: 'Ha-Haught',
              brandOwner: 'Live Fields Inc',
              company: 'Oscorp',
              productionRegion: 'Oxnard'
            },
            tagStatus: {
              temperature: 2.4,
              life: 61,
              state: 'Started',
              alerts: {
                code: 2279,
                triggered: 7,
                summary: {
                  powerAlert1: true,
                  lifeAlert1: false,
                  lifeAlert2: true,
                  lifeAlert3: false,
                  lifeAlert4: false,
                  lifeAlert5: false,
                  tempAlert1: true,
                  tempAlert2: true,
                  tempAlert3: true,
                  tempAlert4: false,
                  elapsedAlert1: true,
                  elapsedAlert2: true
                }
              }
            },
            alerts: {
              powerAlerts: [{
                seen: 100,
                powerAlert1: true,
                battery: '10%'
              }],
              lifeAlerts: [{
                life: 87,
                seen: null,
                lifeAlert1: false
              }, {
                life: 69,
                seen: 100,
                lifeAlert2: true
              }, {
                life: 54,
                seen: null,
                lifeAlert3: false
              }, {
                life: 45,
                seen: null,
                lifeAlert4: false
              }, {
                life: 33,
                seen: null,
                lifeAlert5: false
              }
              ],
              tempAlerts: [{
                temp: 5,
                seen: 100,
                tempAlert1: true,
                above: false,
                count: 6,
                inRow: true
              }, {
                temp: 6,
                seen: 100,
                tempAlert2: true,
                above: false,
                count: 3,
                inRow: true
              }, {
                temp: 4,
                seen: 100,
                tempAlert3: true,
                above: false,
                count: 6,
                inRow: false
              }, {
                temp: 10,
                seen: null,
                tempAlert4: false,
                above: true,
                count: 4,
                inRow: true
              }
              ],
              elapsedAlerts: [{
                minutes: '2016-02-03T22:09:53.496Z',
                seen: 100,
                elapsedAlert1: true
              }, {
                minutes: '2016-02-03T22:09:53.497Z',
                seen: 100,
                elapsedAlert2: true
              }]
            }
          },
          eventType: 'FTReadEvent',
          eventTime: '2016-01-05T14:30:15',
          bizLocation: 'Port Hueneme',
          bizStep: 'Receiving',
          readPoint: 'QC/9801-44',
          readerSN: 'Fresho-Berries/John-Doe',
          tagId: 'epc:00000b3b138800010349b15d'
        }
      }, {
        id: 2,
        date: '2015-10-25T23:47:43+05:30',
        source: 'NFC',
        tagJson: {
          eventTime: '2015-04-27T20:26:35Z',
          bizLocation: 'GaryS-WV',
          bizStep: 'getting',
          readerSn: 'BUILDER3GREEN/Builder3',
          tagId: 'epc:33080b3b13880080bc04846f',
          readPoint: 'Infratab-V',
          eventData: {
            alerts: {
              tempAlerts: [{
                inRow: true,
                seen: null,
                temp: -10.0,
                tempAlert1: false,
                above: false,
                count: 10
              }, {
                tempAalert2: false,
                seen: null,
                temp: 0.0,
                inRow: false,
                above: false,
                count: 10
              }, {
                seen: null,
                temp: 25.0,
                inRow: true,
                tempAlert3: false,
                above: true,
                count: 4
              }, {
                seen: null,
                temp: 50.0,
                inRow: false,
                tempAlert4: false,
                count: 2,
                above: true
              }],
              lifeAlerts: [{
                lifeAlert1: true,
                life: 90,
                seen: 48
              }, {
                life: 80,
                seen: 94,
                lifeAlert2: true
              }, {
                lifeAlert3: false,
                life: 50,
                seen: null
              }, {
                lifeAlert4: false,
                life: 25,
                seen: null
              }, {
                life: 5,
                seen: null,
                lifeAalert5: false
              }],
              powerAlerts: [{
                powerAlert1: false,
                seen: null,
                battery: '10%'
              }],
              elapsedAlerts: [{
                elapsedAlert1: true,
                minutes: 60,
                seen: 60
              }, {
                elapsedAlert2: true,
                minutes: 60,
                seen: 60
              }]
            },
            productInfo: {
              q10: '7',
              parentId: '11223344',
              product: 'BlueBerry',
              profileName: 'Test BizData High',
              name: 'Dual-006',
              referenceLife: '58991.617440225',
              referenceTemp: '-30',
              tagLocationX: '5',
              additionalId: '313132323833343438343646',
              tempSenseWhat: 'unidentified',
              tagLocationZ: '43',
              company: 'Test BizDa',
              // tagLocationZ:'111',
              isThisTagSpecial: 'no_freeze'
            },
            tagStatus: {
              startedOn: '2015-04-27 16:59:00',
              state: 'Started',
              temperature: 16.1,
              stoppedOn: '2015-04-27 20:20:00',
              enabledOn: '2015-04-27 16:59:00',
              alerts: {
                triggered: 4,
                summary: {
                  elapsedAlert1: true,
                  tempAlert2: false,
                  tempAlert3: false,
                  tempAlert4: false,
                  powerAlert1: false,
                  lifeAlert5: false,
                  lifeAlert3: false,
                  elapsedAlert2: true,
                  tempAlert1: false,
                  lifeAlert1: true,
                  lifeAlert4: false,
                  lifeAlert2: true
                },
                code: 6147
              },
              life: 57.0
            },
            tagInfo: {
              sensingModel: 'Points',
              tagWhat: 'space'
            }
          },
          eventType: 'FTReadEvent'
        }
      }, {
        id: 3,
        date: '2015-10-25T21:47:43+05:30',
        source: 'QR code',
        tagJson: {
          eventTime: '2015-02-06T22:21:46Z',
          bizLocation: 'Infratab-Oxnard',
          bizStep: 'getting',
          readerSn: 'Calibration2/KOno',
          tagId: 'epc:33080b3b1388000103498886',
          readPoint: 'Calibrations2',
          eventData: {
            alerts: {
              tempAlerts: [{
                inRow: false,
                seen: null,
                temp: -0.100000000000001,
                tempAlert1: false,
                above: false,
                count: 2
              }, {
                tempAlert2: false,
                seen: null,
                temp: 1.9,
                inRow: true,
                above: false,
                count: 2
              }, {
                seen: 24,
                temp: 8.0,
                inRow: true,
                tempAlert3: true,
                above: true,
                count: 2
              }, {
                seen: 24,
                temp: 10.0,
                inRow: true,
                tempAlert4: true,
                count: 2,
                above: true
              }],
              lifeAlerts: [{
                lifeAlert1: true,
                life: 90,
                seen: 154
              }, {
                life: 70,
                seen: 454,
                lifeAlert2: true
              }, {
                lifeAlert3: true,
                life: 50,
                seen: 754
              }, {
                lifeAlert4: true,
                life: 30,
                seen: 1054
              }, {
                life: 10,
                seen: null,
                lifeAlert5: false
              }],
              powerAlerts: [{
                powerAlert1: false,
                seen: null,
                battery: '10%'
              }],
              elapsedAlerts: [{
                elapsedAlert1: true,
                minutes: 600,
                seen: 600
              }, {
                elapsedAlert2: true,
                minutes: 1200,
                seen: 1200
              }]
            },
            productInfo: {
              referenceLife: '25',
              q10: '1',
              product: 'Grapes',
              tagLocationType: '0',
              tempSenseWhat: 'unidentified',
              referenceTemp: '20',
              profileName: 'Log-1Day',
              company: 'Generic',
              name: 'Temperatur',
              isThisTagSpecial: 'no'
            },
            tagStatus: {
              startedOn: '2015-02-06 02:01:00',
              state: 'Started',
              temperature: 17.6,
              stoppedOn: '2015-02-06 22:20:00',
              enabledOn: '2015-02-06 02:01:00',
              alerts: {
                triggered: 8,
                summary: {
                  elapsedAlert1: true,
                  tempAlert2: false,
                  tempAlert3: true,
                  tempAlert4: true,
                  powerAlert1: false,
                  lifeAlert5: false,
                  lifeAlert3: true,
                  elapsedAlert2: true,
                  tempAlert1: false,
                  lifeAlert1: true,
                  lifeAlert4: true,
                  lifeAlert2: true
                },
                code: 6543
              },
              life: 20.0
            },
            tagInfo: {
              sensingModel: 'Points'
            }
          },
          eventType: 'FTReadEvent'
        }
      }]
    }
  });

  exports.tagDetailsModelObj = new TagDetailsModel();
});

// sample json
// {
//     'tagInfo':{
//                 'tagType':'Sensor',
//                 'tagWhat':'Product',
//                 'temperatureRange':'Cold',
//                 'sensingModel':'Points',
//                 'senseWhat':'Product'
//             },
//     'productInfo':{
//                 'tagId':'epc:33080b3b138800010349e67d',
//                 'additionalId':'NA',
//                 'companyName':'Infratab',
//                 'batchLot':'NA',
//                 'productionData':'NA',
//                 'countryOfRegion':'NA',
//                 'production':'NA',
//                 'document':'NA',
//                 'tagLocation':'NA',
//                 'brandOwner':'GaryS',
//                 'brandName':'NA',
//                 'productSize':'NA',
//                 'useByDate':'NA'
//             },
//     'tagStatus':{
//                 'temperature':12.9,
//                 'life':21,
//                 'state':'Started'
//             },
// 'powerAlerts':[{'seen':140}],
// 'elapsedAlerts':[{
//                 'minutes':10080,'seen':null
//             },{
//                 'minutes':20160,'seen':1152
//             }],
// 'lifeAlerts':[{
//                 'life':95,
//                 'seen':722
//             },{
//                 'life':90,
//                 'seen':1152
//             },{
//                 'life':85,
//                 'seen':1403
//             },{
//                 'life':80,
//                 'seen':1973
//             },{
//                 'life':75,
//                 'seen':2543
//             }],
// 'tempAlerts':[{
//                 'temperature':0,
//                 'seen':null
//             },{
//                 'temperature':8,
//                 'seen':150
//             },{
//                 'temperature':8.2,
//                 'seen':242
//             },{
//                 'temperature':35,
//                 'seen':1132
//             }],
//     'noOfAlerts':10
// }


// {'tagInfo':{'Is This Special ':'No Freeze','Tag What':'Product','Temperature Range':'Cold',
// 'Sensing Model':'Points','Sense What':'Product'},'productInfo':{'Product':'Grapes',
// 'Production Date':'7/15/2014','Use By Date':'11/14/2014','Brand Name':'Flophouse',
// 'Brand Owner':'Zero Point Mills','Product Size':'Pallet','Tag ID':'0188421000.01.4350129117',
// 'GTIN':'003782450174317','Batch/Lot':'201430514321101','Document Number':'63331',
// 'Company':'Zero Point Mills','Country of Origin':'USA','Production Region':'Oxnard'},
// 'tagStatus':{'temperature':8.3,'life':85,'state':'Started','alerts':97}}
