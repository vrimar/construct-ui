@# Transition Manager
A simple utility class to enable/disable CSS open/close transitions. Components affected are: `Dialog`, `Popover`, and `Tooltip`. `TransitionManager.disable()` is equivalent to passing `transitionDuration=0`.

```javascript
import { TransitionManager } from 'construct-ui';
TransitionManager.disable();
```

@example TransitionManagerExample

@## API
@interface TransitionManager

@methods TransitionManager
