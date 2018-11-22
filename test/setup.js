require('jsdom-global')(undefined, { pretendToBeVisual: true });
const matchMediaPolyfill = require('mq-polyfill').default;

global.requestAnimationFrame = () => { }
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
