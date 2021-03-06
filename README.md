# INDESY - Indoor delivery system
[![CircleCI](https://img.shields.io/circleci/project/nicklasfrahm/indesy-webclient/develop.svg?style=flat-square&label=develop)](https://circleci.com/gh/nicklasfrahm/indesy-webclient)
[![CircleCI](https://img.shields.io/circleci/project/nicklasfrahm/indesy-webclient/master.svg?style=flat-square&label=master)](https://circleci.com/gh/nicklasfrahm/indesy-webclient)
[![David](https://img.shields.io/david/nicklasfrahm/indesy-webclient.svg?style=flat-square)](https://david-dm.org/)

## Description
The web application for an indoor delivery system. The web application will be used to manage mapping data and to control the indoor delivery system.

## Installation
Create a `.env`-file and put in the following:
```ini
API_URL=http://localhost:8000
``` 

**Note:** If you want to connect to the production server instead, replace the `API_URL` accordingly.
Be sure to have at least the latest LTS of node installed. Then open a terminal and run:
```shell
npm install
npm start
```

## Build
The build will be run by webpack and the files will be written to the `build` directory. To run the build, simply execute:
```shell
npm run build
```