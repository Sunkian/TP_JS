class Soldier {
  constructor() {
    this.isAlive = true;
    this.age = 0;
    setInterval(() => {
      this.age++;
      this.isAlive = this.isAlive
        ? Math.random() <= (80 - this.age) * 0.01 + 0.2
        : false;
    }, 1000);
  }

  starve() {
    this.isAlive = this.isAlive ? this.age < 60 : false;
  }

  defend() {
    this.isAlive = this.isAlive ? Math.random() > 0.2 : false;
  }

  attack() {
    this.isAlive = this.isAlive ? Math.random() > 0.5 : false;
  }
}

module.exports = {Soldier};
