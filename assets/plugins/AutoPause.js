class AutoPause {
  constructor() {
    this.threshold = 0.25;
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibityChange = this.handleVisibityChange.bind(this);
  }

  run(player) {
    this.player = player;
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    });
    observer.observe(player.media);

    document.addEventListener('visibilitychange', this.handleVisibityChange);
  }

  handleIntersection(entries) {
    const entry = entries[0];
    const isVisible = entry.intersectionRatio >= this.threshold;
    isVisible ? this.player.play() : this.player.pause();
  }

  handleVisibityChange() {
    const isVisible = document.visibilityState === 'visible';
    isVisible ? this.player.play() : this.player.pause();
  }
}

export default AutoPause;
