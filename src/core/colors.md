@# Colors

Construct-ui provides a set of colors based on the <a href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors">2014 Material Design color spec</a>. 

Colors can be used in your JS code like so:

```javascript
import { Colors } from 'construct-ui'; 

m('', { style: { color: Colors.RED100 }})
```

Sass variables can also be used:

<pre><code class="css">@import '~construct-ui/lib/scss/variables';

.red {
  color: $red100
}
</code></pre>

@example ColorsExample
