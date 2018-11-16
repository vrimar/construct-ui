import highlightjs from 'highlight.js';

export function highlightCode() {
  const blocks = document.querySelectorAll('pre code');
  Array.from(blocks).map(block => {
    highlightjs.highlightBlock(block);
  });
}
