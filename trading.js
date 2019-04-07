class Trading {
  constructor() {
    this.isSummer = true;
  }

  switchSeason() {
    this.isSummer = Math.random() > 0.5;
    // Console.log(this.isSummer ? 'été' : 'hiver');
  }
}

module.exports = {Trading};
