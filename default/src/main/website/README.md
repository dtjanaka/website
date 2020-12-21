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
note: so that I could change npm run build script from:
"build": "react-scripts build",
to:
"build": "react-scripts build && rm -rf ../webapp/static/ && mv build/* ../webapp/ && rm -rf build",
:D

sudo apt update
sudo apt install nodejs
sudo apt install npm
npx create-react-app [appName] --use-npm

note: added to package.json:
"homepage": ".",
so index.html of production build loads in browser properly