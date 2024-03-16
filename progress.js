class ProgressBar {
  setInterval;
  initialDeg = 0;
  isAnimating = false;
  speedNormal = 10;
  speedAnimate = 10;
  constructor(circle, containerProgress, input) {
    this.circle = circle;
    this.containerProgress = containerProgress;
    this.radius = this.circle.getAttribute('r');
    this.circumference = 2 * Math.PI * this.radius;
    this.circle.style.strokeDashoffset = this.circumference;
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.input = input;
  }
  handleChange(persent) {
    if (persent > 100) {
      this.input.value = 100;
    }
    if (persent < 0) {
      this.input.value = 0;
    }

    this.setNormal(this.input.value);
  }

  setNormal(persent) {
    let startPersent = 0;
    let offset = this.circumference;
    const setIntervalNormal = setInterval(() => {
      if (startPersent == persent) {
        clearInterval(setIntervalNormal);
      }
      offset = this.circumference - (startPersent / 100) * this.circumference;
      this.circle.style.strokeDashoffset = offset;
      startPersent = startPersent + 1;
    }, this.speedNormal);
  }

  animate() {
    let startDeg = this.initialDeg;
    if (!this.isAnimating) {
      this.setIntervalAnimate = setInterval(() => {
        startDeg = startDeg + (2 % 360);
        this.circle.style.rotate = `${startDeg}deg`;
      }, this.speedAnimate);
    }
  }

  setAnimated(checkedAnimate) {
    if (checkedAnimate && !this.isAnimating) {
      this.animate();
    } else {
      this.isAnimating = false;
      clearInterval(this.setIntervalAnimate);
      this.circle.style.rotate = `${this.initialDeg}deg`;
    }
  }

  setHidden(checkedHide) {
    checkedHide
      ? (this.containerProgress.style.visibility = 'hidden')
      : (this.containerProgress.style.visibility = 'visible');
  }
}
const progressContainer = document.querySelector('.progress');
const circle = document.getElementById('circle');
const input = document.querySelector('.number__input');
let progressBar = new ProgressBar(circle, progressContainer, input);
