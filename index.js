/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

const { AppRegistry } = require('react-native');
const App = require('./source/App');
const { name: appName } = require('./app.json');

AppRegistry.registerComponent(appName, () => App);

