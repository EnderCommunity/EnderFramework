//Use LocalStorage to store the apps' permissions and settings
var pM = require('./powerMonitor.js');
exports.powerMonitor = () => {
  pM.start();
};