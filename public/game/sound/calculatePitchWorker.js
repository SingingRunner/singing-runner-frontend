class AMDF {
  constructor(params) {
    this.sampleRate = params.sampleRate;
    this.minFrequency = params.minFrequency;
    this.maxFrequency = params.maxFrequency;
    this.sensitivity = params.sensitivity;
    this.ratio = params.ratio;
    this.amd = [];

    /* Round in such a way that both exact minPeriod as
       exact maxPeriod lie inside the rounded span minPeriod-maxPeriod,
       thus ensuring that minFrequency and maxFrequency can be found
       even in edge cases */
    this.maxPeriod = Math.ceil(this.sampleRate / this.minFrequency);
    this.minPeriod = Math.floor(this.sampleRate / this.maxFrequency);
  }

  AMDFDetector(float32AudioBuffer) {
    const sampleRate = this.sampleRate;
    const sensitivity = this.sensitivity;
    const ratio = this.ratio;
    const amd = this.amd;
    const minPeriod = this.minPeriod;
    const maxPeriod = this.maxPeriod;
    const maxShift = float32AudioBuffer.length;
    let t = 0;
    let minval = Infinity;
    let maxval = -Infinity;
    let frames1, frames2, calcSub, i, j, u, aux1, aux2;
    // Find the average magnitude difference for each possible period offset.
    for (i = 0; i < maxShift; i++) {
      if (minPeriod <= i && i <= maxPeriod) {
        for (
          aux1 = 0, aux2 = i, t = 0, frames1 = [], frames2 = [];
          aux1 < maxShift - i;
          t++, aux2++, aux1++
        ) {
          frames1[t] = float32AudioBuffer[aux1];
          frames2[t] = float32AudioBuffer[aux2];
        }
        // Take the difference between these frames.
        const frameLength = frames1.length;
        calcSub = [];
        for (u = 0; u < frameLength; u++) {
          calcSub[u] = frames1[u] - frames2[u];
        }
        // Sum the differences.
        let summation = 0;
        for (u = 0; u < frameLength; u++) {
          summation += Math.abs(calcSub[u]);
        }
        amd[i] = summation;
      }
    }
    for (j = minPeriod; j < maxPeriod; j++) {
      if (amd[j] < minval) minval = amd[j];
      if (amd[j] > maxval) maxval = amd[j];
    }
    const cutoff = Math.round(sensitivity * (maxval - minval) + minval);
    for (j = minPeriod; j <= maxPeriod && amd[j] > cutoff; j++);
    const searchLength = minPeriod / 2;
    minval = amd[j];
    let minpos = j;
    for (i = j - 1; i < j + searchLength && i <= maxPeriod; i++) {
      if (amd[i] < minval) {
        minval = amd[i];
        minpos = i;
      }
    }
    if (Math.round(amd[minpos] * ratio) < maxval) {
      return sampleRate / minpos;
    } else {
      return null;
    }
  }
}
let cnt = 0;
const pitchDetector = new AMDF({
  sampleRate: 44100,
  minFrequency: 82,
  maxFrequency: 1000,
  sensitivity: 0.5,
  ratio: 5,
});

self.addEventListener("message", (event) => {
  if (cnt % 3 === 0) {
    const audioData = event.data.array;
    const pitch = pitchDetector.AMDFDetector(audioData);
    self.postMessage({ pitch, time: event.data.time });
  }
  cnt++;
});
