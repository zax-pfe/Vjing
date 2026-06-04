import Analyzer from "../../sounds/Analyzer.js";
import AnalyzerDebug from "../../sounds/AnalyzerDebug.js";
import EventEmitter from "./EventEmitter.js";
import Experience from "../Experience.js";

export default class Sound extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("sound");
      const debugObject = {
        tranision: () => {
          this.trigger("transition_top");
          console.log("transition event triggered from debug folder");
        },
      };
      this.debugFolder.add(debugObject, "tranision").name("simulate kick");
    }

    this.time = this.experience.time;
    // 'auto' : mode 'live' en standalone, 'receive' dans le VJ host.
    // Tu ne changes rien entre les deux, c'est détecté tout seul.
    this.analyzer = new Analyzer();
    this.analyzerDebug = new AnalyzerDebug(this.analyzer, { width: 160, height: 95, bins: 8 }); // opts optional

    // event emitter for the kick
    this.readKick = true;
    this.analyzerDebug.on("kick", () => {
      if (!this.readKick) return;
      this.trigger("kick");
      // console.log("kick event triggered from AnalyzerDebug");
      this.readKick = false;
      setTimeout(() => {
        this.readKick = true;
      }, 200);
    });

    this.readKickHard = true;
    this.analyzerDebug.on("kickHard", () => {
      if (!this.readKickHard) return;
      this.trigger("kickHard");
      this.readKickHard = false;
      setTimeout(() => {
        this.readKickHard = true;
      }, 400);
    });

    // Les signaux à lire dans tes update() (tous entre 0 et 1)
    this.volume = 0;
    this.volumeSmooth = 0;
    this.kick = 0;
    this.kickHard = 0;
    this.volumeByFrequency = this.analyzer.volumeByFrequency;

    // calcul du BPM
    this.bpm = 0;
    this.timeElapsed = 0;
    this.beatCount = 0;
    this.lastBeatTime = 0;
    // calcule le kick que sur les montée
    this.previousKickHard = 0;
    this.currentKickHard = 0;

    // L'analyzer met ces valeurs à jour à chaque frame
    this.analyzer.onAudio((a) => {
      this.volume = a.volume;
      this.volumeSmooth = a.volumeSmooth;
      this.kick = a.kick;
      this.kickHard = a.kickHard;
      // volumeByFrequency est mis à jour "en place", même référence
    });
  }

  calculateBPM() {
    this.timeElapsed += this.time.delta;

    const threshold = 0.8;

    // Détection du front montant
    if (!this.isKickActive && this.kickHard > threshold) {
      this.isKickActive = true;
      this.beatCount++;

      console.log("Beat détecté !", this.beatCount);
    }

    // Réarmement quand le kick redescend
    if (this.isKickActive && this.kickHard < threshold * 0.5) {
      this.isKickActive = false;
    }

    if (this.timeElapsed > 7000) {
      this.bpm = (this.beatCount / 7) * 60;

      console.log("BPM :", this.bpm);

      this.beatCount = 0;
      this.timeElapsed = 0;
    }
  }

  update() {
    // this.calculateBPM();
    if (this.kick === 0.97) {
      console.log("kick ", this.kick);
    }
  }
}
