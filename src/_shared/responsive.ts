export const Breakpoints = {
  xs: '(max-width: 575.98px)' as '(max-width: 575.98px)',
  sm: '(min-width: 576px) and (max-width: 767.98px)' as '(min-width: 576px) and (max-width: 767.98px)',
  md: '(min-width: 768px) and (max-width: 991.98px)' as '(min-width: 768px) and (max-width: 991.98px)',
  lg: '(min-width: 992px) and (max-width: 1199.98px)' as '(min-width: 992px) and (max-width: 1199.98px)',
  xl: '(min-width: 1200px)' as '(min-width: 1200px)'
};

export type Breakpoint = typeof Breakpoints[keyof typeof Breakpoints];
