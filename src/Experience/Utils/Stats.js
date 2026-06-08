import stat from "stats.js";
export default class Stats {
  constructor() {
    this.stats = new stat();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
    this.stats.begin();
  }

  update() {
    this.stats.update();
  }
}
