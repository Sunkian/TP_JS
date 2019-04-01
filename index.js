const {City} = require('./city');

const a = new City('Versailles', 'Le roi soleil');
setInterval(() => a.showCity(), 1000);
setInterval(() => a.defense(), 7000);
setInterval(() => a.attack(), 3000);
