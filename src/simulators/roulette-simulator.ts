export abstract class RouletteSimulator {
  markers: number[];

  constructor() {
    this.markers = this.createMarkers();
  }

  protected createMarkers(): number[] {
    return [...Array(37)].map((_, i) => i);
  }

  protected rngMarker(): number {
    return Math.floor(Math.random() * 37);
  }
}
