# Initial setup for this project

For Windows (npx issue with spaces in pathname)
npm install create-react-app

npx create-react-app [appName] --use-npm
npm install --save react-router-dom
npm install --save @material-ui/core
npm install --save @material-ui/icons
npm install --save-dev husky lint-staged prettier

Add to package.json:
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
    "prettier --write --single-quote --jsx-single-quote"
    ]
  }

For Ubuntu 20.04
note: I changed the npm run build script
from:
"build": "react-scripts build",
to:
"build": "react-scripts build && rm -rf ../webapp/static/ ../webapp/gltf/ ../webapp/js/ && mv build/* ../webapp/ && rm -rf build",

:D

sudo apt update
sudo apt install nodejs
sudo apt install npm
npx create-react-app [appName] --use-npm

note: added to package.json:
"homepage": ".",
so index.html of production build loads in browser properly

Favicons generated with realfavicongenerator.net
Current settings:
Desktop browsers and Google result pages
Add margins and a plain background
* Background color #000000
* Default background radius and image size
iOS - web clip
* Background color #000000
* Margin size 8px
Favicon for Android Chrome
* Add a solid, plain background to fill the transparent regions
* Background color #000000
* Margin size 12px
* App name Dylon
* Theme color #000000
Windows Metro
* #ff4000
* Use a white silouhette version of the favicon
macOS Safari
* Use a silhouette of the original image
* Theme color #ff4000
Placed at root

For updating dependencies
https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version did not work as expected
Instead, removing node_modules and running npm install seemed to do the trick without breaking ~~anything~~ production
However, this did break linting with husky (for Git hooks), lint-staged, and prettier

As suspected, this was caused by differences in husky versions
https://typicode.github.io/husky/#/?id=custom-directory

Add to package.json:
  "scripts": {
    "prepare": "cd ../../../.. && husky install .husky"
  }

Then, I ran deleted node_modules and ran npm i from default/src/main/website

lint-staged has to be run from the pre-commit file
https://github.com/typicode/husky/issues/949

Add to package.json:
  "scripts": {
    "pre-commit": "lint-staged"
  }

Then, to add the pre-commit file
https://typicode.github.io/husky/#/?id=create-a-hook

npx husky add .husky/pre-commit "npm run pre-commit"