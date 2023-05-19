import { RouletteSimulator } from "./roulette-simulator";

export class DussinSimulator extends RouletteSimulator {
  dussinMarkers: number[];

  constructor(dussins: number[]) {
    super();
    this.validateInput(dussins);
    this.dussinMarkers = dussins
      .map((o) => this.createDussin(o, this.markers))
      .flat();
  }

  private validateInput(dussins: number[]) {
    if (
      new Set(dussins).size !== dussins.length ||
      dussins.some((o) => o < 1 || o > 3)
    ) {
      throw new Error("Invalid input");
    }
  }

  protected createDussin(offset = 1, markers: number[]): number[] {
    const dussin: number[] = [];

    for (let i = offset; i < markers.length; i += 3) {
      if (markers.indexOf(i) !== -1) {
        dussin.push(i);
      }
    }

    return dussin;
  }

  run(
    losingStreakBreak: number,
    doubleImmediately = false,
    initialBet = 2,
    winsBreak = 50
  ) {
    let currentBet = initialBet;
    let balance = 0;
    let skip = false;
    let i = 0;
    let losingStreak = 0;
    const seq = [2, 4, 12, 36];

    while (true) {
      if (
        losingStreak >= losingStreakBreak ||
        balance > initialBet * winsBreak
      ) {
        break;
      }

      i++;
      const rngMark = this.rngMarker();
      currentBet = seq[losingStreak]!;

      if (!doubleImmediately && skip) {
        skip = !this.dussinMarkers.includes(rngMark);
        continue;
      }

      if (this.dussinMarkers.includes(rngMark)) {
        balance += currentBet;
        losingStreak = 0;
      } else {
        skip = true;
        balance -= currentBet * 2;
        losingStreak++;
      }
    }

    console.log({
      balance,
    });
  }
}
