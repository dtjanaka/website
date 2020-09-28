# Initial setup for this project

For Windows (npx issue with spaces in pathname)
npm install create-react-app

npx create-react-app [appName] --use-npm --template typescript
npm install --save react-router
npm install --save @material-ui/core
npm install --save-dev husky lint-staged prettier

Add to package.json:
  "husky": {
    "hooks": {
    "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write --single-quote --jsx-single-quote"
    ]
  }