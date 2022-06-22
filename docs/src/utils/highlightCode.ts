import highlightjs from 'highlight.js';
import 'highlight.js/styles/github.css';

export function highlightCode() {
  const blocks = document.querySelectorAll('pre code');

  Array.from(blocks).map(block => {
    highlightjs.highlightBlock(block as HTMLElement);
  });
}
