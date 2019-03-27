export const setupServiceWoker = async () => {
  // serviceworker
  const script = document.createElement('script');
  script.onload = () => {
    console.log('Loaded Serviceworker. The serviceworker helps us with notifications and offline capabilities, so you can also read this site when your device is offline.');
  };
  script.src = 'serviceworker/mainthread.js';
  document.head.appendChild(script);
};
