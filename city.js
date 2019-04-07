const {Divinity} = require('./divinity');
const {Soldier} = require('./soldier');
const {Trading} = require('./trading');

class City {
  constructor(name, divinityName) {
    this.name_ = name || 'UNKCITY';
    this.divinity_ = new Divinity(divinityName);
    this.corn_ = 10000;
    this.gold_ = 10000;
    this.army_ = [];
    this.init();
    this.trading_ = new Trading();
  }

  init() {
    this.divinity_.init();
    this.divinity_.worldEvents.on('favor', favor =>
      this.receiveFavorFromGod(favor)
    );
    this.divinity_.worldEvents.on('blessing', blessing =>
      this.receiveFavorFromGod(blessing)
    );
    this.divinity_.worldEvents.on('retribution', retribution =>
      this.receiveRetribution(retribution)
    );
  }

  receiveRetribution(r) {
    console.log(`${this.name_} Vous vous êtes fait punir par le Dieu`);
    this.army_ = this.army_.slice(r);
  }

  receiveFavorFromGod(s) {
    this.corn_ += Math.floor(s.corn);
    this.gold_ += Math.floor(s.gold);
    this.giveOffrandToGod();
    this.cleanarmy();
    this.manageArmy(0.8);
    this.manageCorn();
    this.starvation();
    this.trading_.switchSeason();
    this.manageTrading(); //
  }

  giveOffrandToGod() {
    if (this.corn_ > 0) {
      const cornOffered = Math.floor(this.corn_ * 0.5);
      this.corn_ -= cornOffered;
      this.divinity_.offeringCorn(cornOffered);
    }

    if (this.gold_ > 0) {
      const goldOffered = Math.floor(this.gold_ * 0.5);
      this.gold_ -= goldOffered;
      this.divinity_.offeringGold(goldOffered);
    }
  }

  showCity() {
    console.log(`${this.name_}: C ${this.corn_}, G ${this.gold_}`);
    console.log(`Notre armée contient ${this.army_.length} soldats`);
  }

  manageCorn() {
    this.corn_ -= this.army_.length * 10;
  }

  //
  manageTrading() {
    if (this.trading_.isSummer) {
      this.corn_ += this.corn_ * 2;
      // Console.log("C'est l'été, on a de bonnes récoltes");
    } else {
      this.corn_ -= this.corn_ * 0.5;
      // Console.log("C'est l'hiver, les récoltes sont gelées");
    }
  }

  manageArmy(percent) {
    if (this.gold_ > 1000) {
      const goldForArmy = Math.floor(this.gold_ * percent);
      const troopcost = 150;
      for (let i = 0; i < goldForArmy / troopcost; i++) {
        this.army_.push(new Soldier());
        this.gold_ -= troopcost;
      }
    }
  }

  defense() {
    console.log(`${this.name_} Defend`);
    this.army_.forEach(soldier => soldier.defend());
    this.cleanarmy();
  }

  attack(enemyCity) {
    console.log(`${this.name_} Attaque`);
    enemyCity.defense();
    this.army_.forEach(soldier => soldier.attack());
    this.cleanarmy();
    this.gold_ += this.army_.length * 30;
    this.corn_ += this.army_.length * 30;
  }

  starvation() {
    if (this.corn_ < 0) {
      this.army_.forEach(soldier => soldier.starve());
    }
  }

  cleanarmy() {
    this.army_ = this.army_.filter(soldier => soldier.isAlive);
  }
}

module.exports = {City};
