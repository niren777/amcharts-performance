# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.2.1] - [2018-12-06]

### Fixed 
- The number of alerts triggered is finally being displayed for each legend in the alerts triggered chart in Analysis page-2.
- The two-way interaction between the pie chart and its legend in Analysis page-1 is now finally working as expected.
- The pie chart in Analysis page-1 now displays our custom colors instead of amCharts default color set.
- The issues caused due to problems in importing the d3.js library using require.js are now fixed.
- Multiple typos have been fixed.

## [1.2.0] - [2018-12-05]

### Added
- "Read Tags/Get Data" is now inserted into our EventsDB via our WebAPI

## [1.1.2] - [2018-11-14]

### Changed
- The amCharts library has been updated from v4.0.0-beta.46 to v4.0.0-beta.55.
- Changed Alerts triggered chart to look like Manhattan chart.

### Fixed 
- The lingering loading icon issue that happens during initial app setup is now fixed.
- The tooltips for all the charts in the Tag details and Analysis sections now works as expected.
- The expected toast message is now shown when any NFC action is attempted in a non-NFC phone by using voice navigation commands.
- The cursors in charts (where applicable) are now positioned at the center of the chart during initial load.

## [1.1.1] - [2018-09-23]

### Changed
- The request data format for Run Tags events to insert into DB.

### Fixed 
- Inspect grade slider value is now saved on user selection.

## [1.1.0] - [2018-09-19]

### Added
- Run Tags events ("Enable", "Start" and "Stop") have been inserted into the DB.

### Changed
- Re-arrange the intro and app preferences slider order as per the sidebar.
- Replaced the sidebar menu item image icons ("Read", "Inspect", "Handover", "Ungroup" and "checkpoint") with font icons.
- The "Auth0 JWT token" refresh logic has been updated.

### Fixed
- NFC action are not accessible for non-NFC phone using voice navigation commands.
- Numbering for the session name has been fixed.
- Sidebar menu items icon and text alignment has been fixed.
- Handle error case for login page.
- Minor UI bug fixes.

## [1.0.1] - [2018-09-02]

### Changed
- Amchart has been updated from v4.0.0-beta.30 to v4.0.0-beta.46.
- FTMobileComInterface plugin has been updated from v1.1.0 to v1.2.0.
- "Analysis" page-1 filter now provides filtered data to page-2 also.
- The "view check status summary" button present in the Analysis page-1 (for check status and get data actions) has been renamed to "Tag Reads Summary".	
- Re-arrange the menu buttons in the Sidebar and the Home page

### Removed 
- Filter from the app bar in the Analysis page-2.
- Flash LED Filter option.

### Fixed
- Analysis page has been fixed to support no data in charts.
- Date and type(NFC, QR Code and All) filter actions has been fixed for session.
- Improved chart styling in "Analysis", "history" and "tag details" page.
- Fix typos and grammar error in messages shown to user.
- Fix random x axis orientations in Tag Details charts.

## [1.0.0] - [2018-08-17]

### Added
- Swipe tabs to view different sections in the "Tag Details" screen.
- "Freshtime Cloud" button and a message have been added in the intro screen.
- The check status screen which was removed in v0.14.0-alpha.2 has been brought back.
- Amchart license has been added for the charts.

### Changed
- Amchart has been updated from v3.21.13 to v4.0.0-beta.30.
- Updated the text from "Filtered" to "Filtered actions" in view history, analysis and check summary screens.
- The UI to show the sessions list in the history screen has been modified.
- "Manage" button now redirects the user to Portal instead of accounts.
- The app bar title in the "Tag Details" screen now displays the active tab dynamically.
- The design of all the charts have been updated for a better look and feel.
- NFC select mode message has been updated.
- Flash LED options have been renamed.
- The "Back" button present in the Session screen (for any NFC action) before the first action has been renamed to "Cancel Session".
- The app bar title in the read tags page has been changed from "Get data" to "Read tags" to reflect the "Check Status" action made available again.
- Migrated from the "legacy" api to "v2".

### Removed
- Signup button from intro and login screens.
- Specialized report menu from sidebar.

### Fixed
- Multiple UI issues in NFC sessions flows have been fixed.
- Design discrepancies in history charts have been fixed.
- The project config has been updated to fix multiple issues in the developer environment setup.
- No bizstep issue with the Checkpoint sessions has been fixed.
- The unresponsive buttons following any API error callback have been fixed.
- Many small UI bugs and grammatical errors in the content have been fixed.
- Filter actions in the history page have been fixed for "Get Data" & "Scan QR".
- The app’s slow response to actions backed by api is handled better by using a loader.

## [0.13.4] - [2018-08-08]

### Fixed
- Update FTMobileComInterface plugin from 1.1.0 to 1.0.1

## [0.13.3] - [2018-08-07]

### Changed
- Updated Auth0 lock library from 9.1.4 to Auth0Cordova library 0.3.0 and currently supports only Android 6+

## [0.14.0-alpha.4] - 2017-12-24

### Added
- Voice based navigation has been added

### Fixed
- Minor bug

## [0.14.0-alpha.3] - 2017-12-21

### Added
- Action based sessions(only for NFC actions) has been introduced, where user can do the action on multiple tags and create a session out of it
- User will be able to remember his choice of mode(Single tap mode, Session mode)

### Changed
- Sessions has been included in history page
- Loader will be shown when the NFC tag is detected

### Fixed
- Improved chart styling
- Minor bug fixes

## [0.14.0-alpha.2] - 2017-12-14

### Added
- Landscape mode has been supported for Tag details page

### Changed

- Tag details page has been updated to show Points history, Temperature history, and Histogram charts
- Replaced all ChartistJs chart with Amcharts for history and summary charts
- NFC Get data and Scan QR code(Last read data) shows same tag details page
- Enable action has been included in Run tags page

## [0.14.0-alpha.1] - 2017-12-05

### Added
- Launch Freshtime Mobile on tap of Freshtime NFC tag even if the app is not running
- On tap of Freshtime NFC tag anywhere in the app, perform read action on that and show Tag status page
- Support for Enable Tag action has been added

### Fixed
- Minor UI issues

## [0.13.2] - [2017-08-17]

### Changed
- Condition check for Infratab organization checks against updated UUID

## [0.13.1] - 2017-06-12

### Changed
- Add `confirmationCodeGeneratedAt` attribute and `organizationId` to Confirmation code
- UI for tag status page has been updated
- Bizstep value will be now set for all NFC actions

### Fixed
- Use the eventTime for showing `dataCollectedOn` value of tag read
- If the eventTime is missing for last recorded data on then show the `Not available` text
- Minor bug fixes

## [0.13.0] - 2017-05-25

### Added
- A Pie chart has been added to show the summary of actions on tag
- Different charts has been added to show the 'Types of tag', different Distribution and alerts for the Check status actions
- Bar chart has been added in history page to show the number of actions done on every date
- Summary of actions on tag can be now filtered by date range
- Scss linter has been added

### Fixed
- Issue with none of the options are selected for Add checkpoint and Flash LED action has been fixed
- Minor bug fixes  

## [0.12.4] - 2017-05-15

### Changed
- Tag id will be shown in tag details page
- Include status of server with internet connection page

### Fixed
- Show proper text wherever data is missing
- Minor bug fixes  

## [0.12.3] - 2017-05-05

### Fixed
- Collect the tag Id from tag on Check Status action
- Do not include the Flash LED actions in history page and summary page
- Show the correct value for Minimum temperature and Maximum temperature in summry page
- Fix the issue with filling the inspection form more than once for Handover action

## [0.12.2] - 2017-05-03

### Changed
- Redesigned default home page to card based design.

## [0.12.1] - 2017-04-26

### Changed
- Redesigned default home page
- Folder structure for models, views and templates has been changed
- Change the status bar color based on app page

### Fixed
- Check is device has nfc support for Troubleshoot and Check Status pages
- Show back arrow instead of cross icon in the header for nfc action page
- Styling issues have been fixed for nfc page

## [0.12.0] - 2017-03-24
### Added
- NFC Start tag, Stop tag, Add checkpoint, Check status and Flash LED events has been added

### Changed
- Home screen, intro slider and sidebar ui have been updated to include the nfc events
- Filter options have been updated to include the nfc events(Start tag, Stop tag, Add checkpoint) and source (NFC, QR code)

### Fixed
- Product name will be shown in app bar for the tag read

## [0.11.1] - 2017-03-19
### Fixed
- No organization page is styled properly
- Loading the materialize.js file properly with correct shim config
- Actions in history is being grouped correctly based on date
- Issue with modals is fixed
- Minor bug fixes


## [0.11.0] - 2017-02-10
### Added
- Added cross walk plugin to make default web view for all the version of android

### Fixed
- Confirmed handover action works now
- The message shown when a user does not belong to any organization has been fixed
- Fixed grammar in messages shown to user
- Minor bug fixes

## [0.10.2] - 2017-02-02
### Changed
- Passed necessary options to lock to support Auth0 Change password flow2.

## [0.10.1] - 2017-01-21
### Fixed
- Specialized report will be shown only for Infratab organization
- Fix issue with loading powerbi libraries

## [0.10.0]- 2017-01-15
### Added
- An "Specialized Report" page has been added to show Power Bi report which is available in the sidebar.

## [0.9.4] - 2017-01-12
### Fixed
- Fixed Mixpanel events.
- Fixed dependency issues with backbone.radio.js and Materialize.js.


## [0.9.4-alpha.1] - 2017-01-05
### Changed
- Updated Libraries to their latest version.
- Updated cordova plugins.
- Now data is logging into Mixpanel Dashboard.
- Updated version check api to support expired version date.

### Fixed
- Fixed issues with grade slider 4 and 5.
- Fixed esLint as a part of grunt deploy.
- Text inside donut is now coming for life alert details for Android 4.2.
- Showing loader to handle slow internet connection while making API calls.


## [0.9.3] - 2016-10-20
### Changed
- Grade slider now shows the 2, 3 and 4 numbers also in the ticks and has a tip shown for users

### Fixed
- While making API call for handover and while generating confrimation, enforce the user to Turn on the location service, instead of doing nothing
- Fixed issues with grunt setup
- Long aggregation unit names are now truncated correctly

## [0.9.2] - 2016-10-15
### Fixed
- Initiating another handover issue has been resolved
- Covered the error case for no tag found for the existing QR code
- Fixed issues with showing proper error messages for inspection and group actions

## [0.9.2-alpha.1] -  2016-10-05
### Fixed
- Sentry to log errors along with the application release version.
- Code refactoring.
- Grunt task for git release.

## [0.9.1] - 2016-09-25
### Fixed
- Show proper error message if there is no tag data found while reading the tag for first time
- Show proper error message if the tag doesn't belongs to organization while reading the tag

## [0.9.0] - 2016-09-23
### Changed
- All references to aggregagations, inspection notes and handover inventory have been reviewed and normalized to groups, inspect/inspection notes and handover

## [0.8.7] - 2016-09-22
### Added
- An option to enlarge the representative image while adding members to a group

### Fixed
- Blank screen issue with the onscreen keyboard's Go button while editing the aggregation unit has been fixed
- Selecting any of the signs of damage is more intuitive now
- The correct message is now shown when the a member is tried to be added twice to the same group or when an invalid FreshtimeQR code is read

## [0.8.6] - 2016-09-21
### Fixed
- Phone back button issues for the app home page and for the app after visiting the browser page have been fixed
- Covered error cases for inspection, handover and break aggregation cases
- Login screen issues when location service is disabled and in older android phones have been fixed
- UI fixes in the sidebar

## [0.8.5] - 2016-09-19
### Added
- In-app popups informing the user about an available update and also nudging the user to update within a date for critical updates have been added
- A contact support button now comes up in all the alert messages which ask the user to contact support

### Changed
- Slider replaces the radio buttons in the inspection form to select the inventory's grade
- The Organization name from the registered user's organization is displayed in the Log details form which now only collects Readpoint and Bizlocation information.
- An image placeholder is now shown instead of "Loading.." text when the representative images of the aggregation unit labels are shown
- Creating and breaking aggregations and retrieve inventory status are now mentioned as group, ungroup and get data actions in sidebar and filter page
- A confirmation is now necessary for deleting an aggregation unit
- All barcode imagery shown inside the app now are GS1-128 type barcodes instead of the UPC-A type barcodes shown earlier

### Fixed
- Fixed issue with Set up message dialog box behavior
- Temperature values in tag details page get updated right away when the temperature unit is changed in sidebar
- The phone back button does not make the app go to unexpected places anymore
- The issue with the intro slider arrows on swiping has been fixed

## [0.8.4] - 2016-09-09
### Added
- Mixpanel analytics to track users and the engagement analytics of the app
- Legal page in the About section of the app

### Changed
- No interenet connection page styling looks much better now
- Images now get compressed to dimensions of 600px x 800px (25kb-35kb)
- The close button in tag details page takes you to the previous page instead of to the Home page

### Removed
- Intro slider arrows for the first and last slides have been removed
- Bizstep field has been removed from the Log Details page

### Fixed
- All icons on the home page and sidebar now match and are consistent in their look and feel
- Tag is now a mandatory allowed member when creating any new aggregation unit
- Correct sidebar menu gets active now
- Image loading text is shown now, when it takes longer to load the representative image in the Manage aggregations page
- Other UI fixes in the Setup, Customize App pages
- Tag reads are now again visible in the History page
- Aggregation units are shown in the proper order now - Last added will be shown first in the list

## [0.8.3] - 2016-09-03
### Added
- App homescreen can now be customized into any of the 5 homescreen templates (Get data homescreen, Handover homescreen, Inspect home screen, Group/Ungroup homescreen and a default homescreen)
- A loading screen has been added as it has been noticed that generating the confirmation code takes longer time once in a while
- Clear error and validation messages have been added while reading wrong bar codes while grouping/ungrouping, handovers, inspects and getting data
- The active menu in the sidebar is highlighted

### Changed
- Project directory structure has been changed to bring it closer to a standard frontend project structure
- Close button on the handover confirmation page is changed to work like a back button instead of directing to home page
- Particular bizstep values are now being set for each of "Handover", "Get Data" and "Inspect"
- The very long list in the sidebar now has a couple of accordians for "Group/Ungroup" and "Customize" and an active element styling has been provide
- The build process is now automated with grunt

### Fixed
- The tap action on the stepper to go between the three steps while creating an aggregation has been fixed

## [0.8.2] - 2016-08-31
### Added
- Activating stepper in create aggregation on click action is supported

### Changed
- Update button in edit aggregation unit will be enabled only if there are any unsaved changes
- Same name for different aggregation unit is not allowed
- Swipe action in build aggregation step has been done using materialize carousel
- Date input fields will be enabled only if the filter option custom range
- Back and NEXT button in add to aggregation page is supported
- Damage options interactions in inspection has changed
- Landing page design is updated

### Fixed
- Fix bug with enabling or disabling Confirm button in inpspection page
- The camera restart bug in Android v6.0 is fixed by requesting for camera permission on app load
- Minor bug fixes

## [0.8.1] - 2016-08-26
### Changed
- "No internet connection" message now will be shown in full screen dialogue
- The way DELETE request is being made for delete aggregation and delete aggregation unit has been changed to make POST API
- Restyled auth0 login page

### Fixed
- Do not show aggregation unit list if there is no user created units
- Fix the API redirection by adding trailing slash before the paramater
- Pass necessary data for API request which were missing

## [0.8.0] - 2016-08-21
### Added
- Added Sentry for error tracking
- Aggregation units can now be defined by our customers
- Freshtime tags can now be grouped together and associated with any aggregation unit of our customers
- Inventory handover events can now be tracked and confirmed
- Inspection notes can be added for any individual tag or an association which is a group of tags
- Status and details can now be got for aggregations also

### Changed
- Home page and sidebar designs have been updated to accomodate all the new actions
- History page design has been updated to accomodate all the new actions
- Filter page design has been changed to include date range selection

### Fixed
- UI fixes for lists and dropdowns in Android v4.2
- Username now is represented by a full name field instead of "First name" and "Last name" separately
- Issue with selecting a bizstep in the log page has been fixed

### Removed
- The NFC actions (start, stop, status, checkpoint and flash led) which were implemented in the 0.7.x versions are no longer available

## [0.7.4] - 2016-05-18
### Changed
- Flash LED event now supports options
- Show dropdown of bizsteps instead of input field to enter bizstep

### Fixed
- Fixes order of history items and summaries shown on the screen

## [0.7.3] - 2016-05-13
### Added
- Added checkpoint event.

### Changed
- Lock version has been changed to 9.1.4.
- Now showing events message in toast.
- Changed filters supports filtering tag reads by eventType.

### Fixed
- Fixed sidebar styling issues for lower version of android(<4.4)

## [0.7.2] - 2016-05-09
### Fixed
- Fixed issues with other NFC events after status event.
- Minor UI bug fixes

## [0.7.1] - 2016-05-07
### Fixed
- Passing correct payload for start event instead of dummy data
- Given correct configuration details

## [0.7.0] - 2016-05-07
### Added
- Added status event for nfc
- Added required input field validation for log page.
- Added badges for events in history, tag read and tag status page.

### Changed
- Showing all tag events instead of tag read.

### Fixed
- Fixed tab scroll bug for lower version of android(<4.4)


## [0.6.3] - 2016-05-05
### Added
- Supported flash led to check LED blinks in freshtimeNFC tag.
- Added log page to add details about company name, reaspoint,biz location and biz step.

### Fixed
- Fixed bug, while performing more than one type of event crashes app.

## [0.6.2] - 2016-05-04
### Added
- Added Grunt watch.
- NFC start and stop events has been added.

### Changed
- Removed NFC read event.
- Remove NFC message from home page.

## [0.6.1] - 2016-03-06
### Added
- Added SCAN QR CODE button and NFC message in summaries page If there is only one summary which is running.

### Changed
- The order of tag reads list is now changed to show the last tag read first and the first tag read last
- The order of summaries has also been updated to behave like tag reads
- The time stanp displayed has been modified into a more user friendly way in the tag reads list
- The header text in the share page has been changed to the format "Share Today's Summary" from the format "Today's Summary"
- Changed icon with beta tag

### Fixed
- Some styling bugs for Samsung note series were fixed
- Sidebar scroll fixed for windows phone
- Appbar also scrolling down during delete operation in android versions 4 - 4.2 is fixed
- Numbers have been rounded off to two decimal places in the summary page


## [0.6.0] - 2016-02-29
### Added
- Ability to filter latest tag reads by removing duplicate tag reads when multiple tag reads are present for the same tag
- Ability to select summaries or tag reads for deletion on long press

### Changed
- Disable the filter option, when there are no tag reads found for particular filter
- Editing the summary and filtering the tag reads are now allowed from the summary page
- When tag reads or summaries are selected for deletion, appbar color and the background color of the selected item are changed
- Changed date time format being shown in tag reads page as per material design date format
- Logged at time for log pattern is now generated from client side

### Fixed
- AMD has been implemented in the correct way and the Marionette app now covers the entire application logic
- Changed the ui feeback color to transparent for tap events which apply highlighting on tappable area
- The bottombar is now hidden when tag reads or summaries are selected for deletion
- Fixed back button behavior in app bar when tag reads or summaries are selected for deletion
- Update summary name and end summary actions in edit summary page is now supported in lower versions of android (v<=4.4)
- Minor UI and grammar fixes


## [0.5.0] - 2016-02-14
### Added
- QR code tag reads also now added to history and summaries
- Ability to delete mupltiple summaries
- Ability to delete multiple tag reads
- New log LED page has been added
- Ability to filter the tag reads based on source of the tag reads

### Changed
- Hisotry page, your summaries page,list of tag reads page have been to redesigned

### Fixed
- Many UI fixes have been applied for Jellybean (android 4.2)

## [0.4.0] - 2016-02-05
### Added
- An "About" page has been added which is available in the sidebar
- The app now monitors for interent connectivity and does not allow any actions if there is no internet connection

### Changed
- The login screen is now closable and has a new design which contains an appbar

### Fixed
- The signup and reset password buttons in the login screen now work and open the correct accounts dashboard pages
- Buttons respond faster to tap events now
- Many ui fixes have been applied for Jellybean (android 4.2)
- English in the "Tag Status" page now is presented in a human readable format
- Temperature units toggle in the sidebar now updates the data in "Tag Status" page


## [0.3.1] - 2016-01-28
### Fixed
- Fixed the grammar
- Replaced "back" button with "close" button in tag details app bar
- Fixed the time format in the tag list page
- Shows the materialize indicator for active tab in tag details
- Fixed the flexible area scroll issue in tag details
- Better styling for flexible area of status section in tag details
- Fixed the issue with splash screen background color

## [0.3.0] - 2016-01-19
### Added
- #WIP Event and alerts details have been added into tag status (only in the front-end)
- Pattern and version number in splash screen

### Changed
- Tag status has been redesigned and is now called the Tag Details page.
- UI theme of the app
- The app now loads a separate style sheet based on platforms
- Signup and reset password are no longer available from the app login screen

### Fixed
- A bunch of fixes related to ui alignment issues in the app and in the auth0 login screens.
- Makes the send section fixed in share page.
- Fixed image, font and other ui elements' sizes by adding a Windows view port and scaling
- Fixed and optimized when and how the auth token is refreshed

## [0.2.0] - 2015-12-25
### Added
- All the templates are getting precompiled now which makes the app faster.
- Splash screen and icon an Infratab spinner. The auth0 icons were customized also.
- A content security policy has been added to prevent XSS threats

### Fixed
- Unique summary names
- Summaries are now removed on delete of last tag read in that summary. No more empty summaries!
- Update number of tags added to summary in sidebar in real time
- Fixed the issue with the default temperature unit not updating
- Minor templating bugs

## [0.1.0] - 2015-11-10
This is the first release.
