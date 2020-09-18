@# Responsive Manager
A utility class that provides a simple wrapper over the <a href="http://www.simplestatemanager.com/">ssm</a> library for detecting media query changes.
The default breakpoints (shown below) can be overriden by calling `ResponsiveManager.initialize` with custom values for the different sizes.

```javascript
import { ResponsiveManager } from 'construct-ui';

ResponsiveManager.initialize({
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px) and (max-width: 767.98px)',
  md: '(min-width: 768px) and (max-width: 991.98px)',
  lg: '(min-width: 992px) and (max-width: 1199.98px)',
  xl: '(min-width: 1200px)'
});
```

@example ResponsiveManagerExample

@## API
@interface ResponsiveManager

@methods ResponsiveManager
