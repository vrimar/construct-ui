@# Popover
A popover composes the `Overlay` component and allows for overlain content in relation to a `trigger` element. It leverages the positioning engine of <a href="https://popper.js.org/popper-documentation.html">Popper.js</a> and allows content to "flip" sides based on its `position` and available space. 

@example PopoverExample

@## Controlled State
Setting the `isOpen` attribute will put the popover in <b> controlled mode </b>. Every event that modifies the open state will call the `onInteraction` callback with the `nextOpenState` and the calling `event` as it's parameters.

@example PopoverControlledExample

@## Nested Popovers
By default, nested popovers are closed in sequence. Opening both parent and nested popover in the example below will require two clicks to dismiss them. To dismiss both at once, the nested popover must pass `inline: true` and `addToStack: false` so when its content is clicked, the parent popover doesn't close. 

@example PopoverNestedExample

@## Popover Attrs
@interface IPopoverAttrs
