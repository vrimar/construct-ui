@# Toast
A toast notifies the user of an action in response to app events.

@example ToastDefaultExample

@## Declarative usage
A toaster can be used declaratively by passing an array of `Toast` items to the `toasts` attribute. Note: the `onDimiss` callback must be provided and correctly handled in order to "dismiss" a toast.
@example ToastDeclarativeExample

@## Toaster Attrs
@interface IToasterAttrs

@## Toaster static methods (imperative mode)
@methods IToaster

@## Toast Attrs
@interface IToastAttrs
