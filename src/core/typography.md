@# Typography

Construct-ui sets a number of global CSS styles for headings, paragraphs, lists, code blocks and links.

## Headings

<h1> H1 Heading </h1>
<h2> H2 Heading </h2> 
<h3> H3 Heading </h3> 
<h4> H4 Heading </h4> 
<h5> H5 Heading </h5> 
<h6> H6 Heading </h6>

```javascript
m('h1', 'H1 Heading'),
m('h2', 'H2 Heading'),
m('h3', 'H3 Heading'),
m('h4', 'H4 Heading'),
m('h5', 'H5 Heading'),
m('h6', 'H6 Heading')
```

## Paragraphs

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor, nisl sed sagittis lacinia, libero tellus varius libero, ut rhoncus tellus justo sed turpis. Suspendisse commodo nisl nibh, sit amet malesuada arcu aliquam in. Morbi eget eros rhoncus, fringilla tellus nec, cursus metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. </p>

```javascript
m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor, nisl sed sagittis lacinia, libero tellus varius libero, ut rhoncus tellus justo sed turpis. Suspendisse commodo nisl nibh, sit amet malesuada arcu aliquam in. Morbi eget eros rhoncus, fringilla tellus nec, cursus metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. ')
```

## Links

<a href='#'> I am a link </a>

```javascript
m('a', { href: '#' }, 'I am a link')
```

## Lists

<ul>
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Eget porttitor lorem</li>
</ul>

```javascript
m('ul', [
  m('li', 'Lorem ipsum dolor sit amet'),
  m('li', 'Consectetur adipiscing elit'),
  m('li', [
    'Nulla volutpat aliquam velit',
    m('ul', [
      m('li', 'Phasellus iaculis neque'),
      m('li', 'Ac tristique libero volutpat at'),
    ])
  ]),
  m('li', 'Faucibus porta lacus fringilla vel'),
  m('li', 'Eget porttitor lorem'),
])
```

## Code

<code> Inline code </code>

<pre>
  <code class="nohighlight">
    m('', 'Sample code block content'),
    m('', 'Sample code block content'),
    m('', 'Sample code block content')
  </code>
</pre>


## Text Utilities

<p class="cui-text-muted"> This text is muted </p>
<p class="cui-text-disabled"> This text is disabled </p>

```javascript
import { Classes } from 'construct-ui';

m(`p.${Classes.TEXT_MUTED}`, 'This text is muted'),
m(`p.${Classes.TEXT_DISABLED}`, 'This text is disabled')
```
