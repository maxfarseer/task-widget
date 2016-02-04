### TRACKER

1) Make your redmine [ready for API calls](http://www.redmine.org/projects/redmine/wiki/Rest_api#Authentication)

Create ./src/js/constants/Secret.js file, those contains:

    export const API_ROOT = 'https://your-redmine.com';

--

2) Start web version

    cp webpack.config.hot.js webpack.config.js
    npm install
    npm start

open [localhost:3000](http://localhost:3000)

--

3) Start desktop

    npm install electron-prebuilt

a) copy webpack static config to main config

    cp webpack.config.static.js webpack.config.js

b) create static bundle.js

    webpack

c) start desktop version

    cd desktop/
    ./node_modules/.bin/electron .

--

4) [create build for OS X](http://electron.atom.io/docs/v0.36.5/tutorial/application-distribution/)

    npm install -g electron-packager
    electron-packager . Tracker --platform=darwin --arch=x64 --version=0.36.5 --out=./build

![Tracker for redmine](http://cs633516.vk.me/v633516237/f8d7/VXegWMdD3A0.jpg)
