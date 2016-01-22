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

  npm install webpack -g

a) copy webpack static config to main config

  cp webpack.config.static.js webpack.config.js

b) create main .js file

  webpack

c) create & start desktop version

  npm install nw -g
  cd desktop/
  npm install
  nw

--

4) create build for OS X

  npm install nw-builder -g
  nwbuild -p osx32 -v 0.12.3 /Users/user/developments/local/task-widget/desktop

![Tracker for redmine](http://cs633516.vk.me/v633516237/f8d7/VXegWMdD3A0.jpg)
