// Web Audio API Sound Synthesizer for Mechanical Clicks and Typing sounds
let audioCtx = null;
let isMuted = localStorage.getItem('siteMute') === 'true';

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const getMuteState = () => isMuted;

export const setMuteState = (muted) => {
  isMuted = muted;
  localStorage.setItem('siteMute', muted ? 'true' : 'false');
  window.dispatchEvent(new CustomEvent('soundFXMuteToggled', { detail: muted }));
};

export const subscribeToMuteChange = (callback) => {
  const handler = (e) => callback(e.detail);
  window.addEventListener('soundFXMuteToggled', handler);
  return () => window.removeEventListener('soundFXMuteToggled', handler);
};

export const playClickSound = () => {
  if (isMuted) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Mechanical click: sudden transient sweep down
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.04);

    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.045);
  } catch (e) {
    console.warn('[SOUND] Audio playback error:', e);
  }
};

export const playTypeSound = () => {
  if (isMuted) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Shorter keypress tap
    osc.type = 'sine';
    // Randomize pitch slightly to simulate different key taps
    const freq = 600 + Math.random() * 200;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.02);

    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.025);
  } catch (e) {
    console.warn('[SOUND] Audio playback error:', e);
  }
};
