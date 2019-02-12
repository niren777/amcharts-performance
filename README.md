## Setup Project

- Install Apache Cordova and the Android SDK on a Linux machine as explained [here](https://evothings.com/doc/build/cordova-install-linux.html) and on Windows as explained [here](https://evothings.com/doc/build/cordova-install-windows.html)

- Make sure the following installed properly with appropriate versions

```
node - v10.1.0

npm - 5.6.0

cordova - 7.1.0
```

- Clone the repo.

- Run the following commands

	```
	cd public
	npm install
	cp -r src/ www/
	```

- Run the setup commands
	```
	grunt setup-android
	```

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
            - Solution: Keep checking for any prompts or alerts on your USB connected device and delete the already installed app.
