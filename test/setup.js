require('jsdom-global')(undefined, { pretendToBeVisual: true });
const matchMediaPolyfill = require('mq-polyfill').default;

let lastTime = 0;

global.requestAnimationFrame = (callback, element) => {
  var currTime = new Date().getTime();
  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
  var id = window.setTimeout(function () { callback(currTime + timeToCall); },
    timeToCall);
  lastTime = currTime + timeToCall;
  return id;
};

global.cancelAnimationFrame = () => { }

matchMediaPolyfill(window);

// Setup mockup for popper.js
window.document.createRange = () => ({
  setStart: () => { },
  setEnd: () => { },
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};
