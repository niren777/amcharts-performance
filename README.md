## Setup Project

- Install Apache Cordova and the Android SDK on a Linux machine as explained [here](https://evothings.com/doc/build/cordova-install-linux.html) and on Windows as explained [here](https://evothings.com/doc/build/cordova-install-windows.html)

- Make sure the following installed properly with appropriate versions

```
node - v10.1.0

npm - 5.6.0

cordova - 7.1.0
```

- Install Grunt-cli using ```npm install -g grunt-cli@0.1.3``` commands

- Install ruby 2.3.3 for [windows](https://rubyinstaller.org/downloads/)

- Install sass `gem install sass -v 3.4.22`

- Install sass-lint `gem install scss-lint`

	**NOTE :** sass commands runs in `command prompt with ruby` in widnows.

- Clone the repo.

- Create the `FTmobile/public/src/js/config-variables-development.js` file based on `FTmobile/public/src/js/config-variables.js.example` with appropriate values.
  **NOTE:** Use config-variables-production.js file for production build

- Run the following commands
- Create the config-variables-development.js file in `js` folder (FTmobile/public/src/js) and place the following.
  ```
  /* eslint-disable */
  var AUTH0_CLIENT_ID="oZxgah56qeCV7NVRYo8UO1mzA4u5nOIw";
  var AUTH0_DOMAIN="infratab-staging.auth0.com";
  var accountsServer = "https://accounts.infratab.xyz/";
  var accountsSignUp="https://accounts.infratab.xyz/users/signup/";
  var mixpanelToken = "444077d152110b56c9c99cd992328a33";
  ```
  **NOTE:** Get the config-variables-staging.js and config-variables-production.js file from concerned person and place it inside the (FTmobile/public/src/js) folder

- Change the directory to `public` folder(FTMobile/public) and run the following commands

- Include Auth0Cordova library 
    Auth0Cordova library(https://github.com/auth0/auth0-cordova) is implemented as npm module. Since we don't use any builder like webpack to bundle our client code, we need to `browserify` to convert @auth0/cordova module to .js file and include in index.html file

    The repo is already included Auth0CordovaBuild.js file which is build from `@auth0/cordova` module. 

    I have included file called `auth0Cordova.js` at `src/js/views/auth0Cordova.js` with

    ```
    /* eslint-disable */
    window.Auth0Cordova = require('@auth0/cordova');
    ```

    Executed the command `browserify src/js/views/auth0Cordova.js -o src/js/views/auth0CordovaBuild.js` to have auth0CordovaBuild.js file 
    Added `/* eslint-disable */` in the begining of the `auth0CordovaBuild.js` file, so that eslint won't check this file
    Also I included `src/js/views/auth0CordovaBuild.js` file in index.html

    So If we want to update `@auth0/cordova` module, don't forget to run `browserify command to update `auth0CordovaBuild.js`

    Right now I have installed @auth0/cordova version 0.3.0

- Plugins required for Auth0Cordova library
  - Run `cordova plugin add cordova-plugin-safariviewcontroller@1.4.7`
      - Should not use the latest one since there is JAVA compatible issue 
  - Run `cordova plugin add cordova-plugin-customurlscheme@4.2.0 --variable URL_SCHEME=PACKAGE_IDENTIFIER --variable ANDROID_SCHEME=PACKAGE_IDENTIFIER --variable ANDROID_HOST=AUTH0_DOMAIN --variable ANDROID_PATHPREFIX=/cordova/PACKAGE_IDENTIFIER/callback`
      - Update PACKAGE_IDENTIFIER and AUTH0_DOMAIN as per environment

	```
	cd public
	npm install
	cp -r src/ www/
	```

	**Note:**
	- In config.xml, we have added plugin called `ftmobile-cominterface` pointing to github repo `https://github.com/Infratab/FTMobileComInterface` master branch. If the updated code is in different branch then change the path to that branch either download the repo to your local and use the file path as `file:../../../FTMobileComInterface` or point to the github path of particular branch `https://github.com/Infratab/FTMobileComInterface/tree/sp-fix-nfc-actions`
	- Remove the plugin `com.ourcodeworld.preventscreenshots` from config.xml since we don't use and it'll end up with error in downloading the plugin

- Run the setup commands
	```
	grunt setup-android
	```

   **NOTE:** For setting up the app, run the above commands in git command prompt(git-bash), since this project is using [custom `barcode scanner`](https://github.com/Infratab/phonegap-plugin-barcodescanner), which has few modification for [original plugin](https://github.com/phonegap/phonegap-plugin-barcodescanner) for windows phone, if you run these commands from noraml command prompt, it will not clone the custom repo, becuase of that qr code scanner will not work in project.So use git command prompt.


- Build and run the debugging app as follows:

	```grunt build-android```

    - While doing this you might face some issues like:
        - You have not accepted the license agreements of the following SDK components:
          >>   [Android SDK Platform 26]
            - Solution: Go to ~/Library/Android/sdk/tools/bin or wherever your sdkmanager executable is present and run this:
                      `./sdkmanager --update` and it will ask you to accept the license agreement.
                        If this doesn't work for you, please install required packages by running command:
                        `cd ~/Library/Android/sdk/tools && ./android`(change the location is required) and after this repeat above command.

        - com.android.dex.DexException: Multiple dex files define Lorg/apache/cordova/PermissionHelper;
            - Solution: Please try the solutions mentioned here one by one: https://stackoverflow.com/questions/46562289/multiple-dex-files-define-lorg-apache-cordova-buildhelper

        - If after building the apk, it fails at the installation step
            - Solution: Keep checking for any prompts or alerts on your USB connected device and delete the already installed FTMobile app.


## Release the app in playstore

- Get the `build.json` and `android.keystore` files from concerened person and place them inside the public folder.

- If the app is going to be released for the first time ever, then you need to get the necessary certificates to sign the apk. To get the certificates follow the steps as explained [#get-necessary-certificates-and-keysone-time-for-the-app] and then continue following the next steps from here. If the release is not the first time, then please ignore this step.

- Get the release apk using following command

	`grunt deploy-android --target='{target}'`

	**NOTE:** While building the android release apk, you will get an error `Keystore was tampered with, or password was incorrect`. To fix that issue, search for `if (task.name == 'validateReleaseSigning')` in `build.grade`(FTMobile\public\platforms\android) file and change it to ` if (task.name == 'assembleRelease')`


## Get necessary certificates and keys(One time(First time) for the app)

### For Android

#### 1. Generate .keystore file using following command:

`keytool -genkey -v -keystore <my-release-key.keystore> -alias <alias_name> -keyalg RSA -keysize 2048 -validity 10000`

**NOTE** : `my-release-key.keystore` = keystore file name, `alias_name` = name of alias, these values we are going to use in configuration file(i.e build.json)

For more information refer: http://docs.oracle.com/javase/6/docs/technotes/tools/windows/keytool.html

This command will generate the .keystorye file, place this file in root directory.

#### 2. Give the configuration details in buid.json file

This needs the details that you have given while generating the .keystore file(above step),

Refer documentation for more details: `signing app section` of this documentation(https://cordova.apache.org/docs/en/dev/guide/platforms/android/tools.html)

### For Windows phone

To sign the app for windows phone, first we need to create the certificate files and we need to give the configuration details in build.json

You can find complete details in this [Documentation!](https://cordova.apache.org/docs/en/5.4.0/guide/platforms/win8/packaging.html)

#### 1. Create Certificate files

For creating certificates we need to use makecert.exe util. This tool ships with Windows SDK and can be found under %ProgramFiles(x86)%\Windows Kits\8.1\bin\x64 or %ProgramFiles(x86)%\Windows Kits\8.1\bin\x86

The first thing we need to do is to create a root key for signing our app.

```
Ex:
makecert.exe -n "CN=FakeCorp.com" -r -eku "1.3.6.1.5.5.7.3.3,1.3.6.1.4.1.311.10.3.13" -e "01/01/2020" –h 0 -sv FakeCorp.com.pvk FakeCorp.com.cer
```

Refer the [Documentation!](https://cordova.apache.org/docs/en/5.4.0/guide/platforms/win8/packaging.html) for complete explaination about the above command.

After running makecert for the first time, enter the private password on the screen that pops up.

Once pvk and cer file is created, we need to create a pfx file from these certificates. A pfx (Personal Exchange Format) file contains a variety of cryptographic information, such as certificates, root authority certificates, certificate chains and private keys. To package the certs, we will use the a tool called pvk2pfx. This tool ships with Windows SDK and can be found under %ProgramFiles(x86)%\Windows Kits\8.1\bin\x64 or %ProgramFiles(x86)%\Windows Kits\8.1\bin\x86.

```
EX:
pvk2pfx -pvk FakeCorp.com.pvk -pi pvkPassword -spc FakeCorp.com.cer -pfx FakeCorp.com.pfx -po pfxPassword
```
Where:

pvk : Input pvk file name,

pi : pvk password

spc : Input cert file name

pfx : Output pfx file name

po : pfx password; same as pvk password if not provided

If we provide this pfx file to build.json file, we will have the following error: "The key file may be password protected. To correct this, try to import the certificate manually into the current user's personal certificate store.". In order to import it we have to use certutil from an admin prompt:

```certutil -user -p PASSWORD -importPFX FakeCorp.com.pfx```

Where:

user : Specifies "current user" personal store

p : Password for pfx file

importPfx : Name of pfx file

Once installed, next step is to add packageThumbprint and packageCertificateKeyFile to build.json. In order to find the packageThumbprint, search for the CommonName we've associated with the certificate:

```powershell -Command " & {dir -path cert:\LocalMachine\My | where { $_.Subject -like \"*FakeCorp.com*\" }}"```
