const {City} = require('./city');

const cityList = [];
const nameAndDivinityName = [
  ['Versailles', 'Apollon'],
  ['Rome', 'Dyonisos'],
  ['Memphis', 'Rha']
];
for (let n = 0; n < 3; n++) {
  cityList.push(new City(...nameAndDivinityName[n]));
}

setInterval(
  // ShowCity
  () =>
    cityList.forEach(city => {
      city.showCity();
    }),
  1000
);

setInterval(
  // Attack
  () =>
    cityList.forEach((city, index) => {
      // Console.log(Math.floor(Math.random()*10 %cityList.length));
      const cityToAttack = Math.floor((Math.random() * 10) % cityList.length);
      if (cityToAttack !== index && Math.random() > 0.8) {
        city.attack(cityList[cityToAttack]);
      }
    }),
  2000
);

// SetInterval(() => a.showCity(), 1000);
// setInterval(() => a.defense(), 7000);
// setInterval(() => a.attack(), 3000);
